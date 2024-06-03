const prisma = require('../../config/db');

// Api to create a new product.....................................................................................................
const createNewProduct = async (req, res) => {
  try {
    const {
      productTitle,
      description,
      price,
      styleCode,
      discountPrice,
      categoriesId,
      sku,
      fabric,
      wash,
      fit,
      productStockList,
    } = req.body;

    // Check if required fields are present
    if (!productTitle || !description || !price) {
      return res.status(400).json({ message: 'All Fields are mandatory!' });
    }

    // Check if files are uploaded
    if (req.files) {
      // Initialize variables to store file locations
      let thumbnailList = '';
      let bannerImage = '';
      let sizeChart = '';
      let productImage = [];

      // Extract file locations based on field names
      req.files.map((file) => {
        if (file.fieldname === 'thumbnail') {
          thumbnailList = file.location;
          return;
        }
        if (file.fieldname === 'bannerImage') {
          bannerImage = file.location;
          return;
        }
        if (file.fieldname === 'sizeChart') {
          sizeChart = file.location;
          return;
        }
        if (file.fieldname === 'productImage[]') {
          productImage.push(file.location);
        }
      });

      // Create new product entry in database
      const createProduct = await prisma.product.create({
        data: {
          productTitle,
          description,
          styleCode,
          discountPrice: parseInt(discountPrice),
          price: parseInt(price),
          sku,
          fabric,
          wash,
          fit,
          sizeChart: sizeChart,
          thumbnail: thumbnailList,
          bannerImage: bannerImage,
          categoriesId: categoriesId,
          productimage: productImage,
        },
      });

      // Create associated product stock entries
      productStockList.map(async (item) => {
        await prisma.productStock.create({
          data: {
            color: item.color,
            size: item.size,
            quantity: parseInt(item.quantity),
            productId: createProduct.id,
          },
        });
      });

      // Respond with success message
      res.status(201).json(createProduct);
    } else {
      // Respond with error message if no files are uploaded
      res.json({ message: 'Please Insert Product Image!' });
    }
  } catch (err) {
    // Handle internal server error
    console.log(err);
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api to retrieve all products in a specific category............................................................................
const getAllProducts = async (req, res) => {
  try {
    const categoriesName = req.params.categoriesName;
    const categoriesDetail = await prisma.categories.findFirst({
      where: {
        catName: categoriesName,
      },
    });
    const getAllProducts = await prisma.product.findMany({
      where: {
        categoriesId: categoriesDetail.id,
      },
      include: {
        categories: true,
        ProductStock: true,
      },
    });
    if (!getAllProducts) {
      return res.status(404).json({ message: 'Products not found' });
    }
    const totalProducts = await prisma.product.count({});
    res.status(200).json({
      message: 'Get All Products Successfully!',
      getAllProducts,
      totalProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// Api to retrieve all products with optional filters and pagination.............................................................
const getAllProductsList = async (req, res) => {
  try {
    let { search, active, banner, featured, page, pageSize } = req.query;

    // Convert string query params to boolean if provided
    if (active !== undefined) {
      if (active === 'false') {
        active = false;
      } else if (active === 'true') {
        active = true;
      }
    }

    // Retrieve products based on filters and pagination
    const getAllProducts = await prisma.product.findMany({
      where: {
        AND: [
          {
            productTitle: {
              startsWith: search,
              mode: 'insensitive',
            },
          },
          { isActive: active },
          { isbannerImage: banner },
          { featuredProduct: featured },
        ],
      },
      include: {
        categories: true,
        ProductStock: true,
      },
      skip: (page - 1) * pageSize,
      take: parseInt(pageSize),
    });

    // Retrieve total count of products
    const totalProducts = await prisma.product.count({});

    if (!getAllProducts) {
      return res.status(404).json({ message: 'Products not found' });
    }

    // Respond with products and total count
    res.status(200).json({
      message: 'Get All Products Successfully!',
      getAllProducts,
      totalProducts,
    });
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// Api to retrieve product by ID..............................................................................................
const getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const getProduct = await prisma.product.findFirst({
      where: {
        id: productId,
      },
      include: {
        categories: true,
        ProductStock: true,
      },
    });
    if (!getProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).send(getProduct);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// Api to update product details...............................................................................................
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      productTitle,
      description,
      price,
      rating,
      fabrics,
      discountPrice,
      styleCode,
      categoriesId,
      fabric,
      wash,
      fit,
    } = req.body;

    // Initialize variables to store file locations
    let thumbnailListFiles = '';
    let bannerImageFiles = '';
    let sizeChartFiles = '';
    let productImagefiles = [];

    // Retrieve existing product details
    const oldProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    thumbnailListFiles = oldProduct.thumbnail;
    bannerImageFiles = oldProduct.bannerImage;
    productImagefiles = oldProduct.productimage;

    // Update file locations if new files are uploaded
    if (req.files.length !== 0) {
      req.files.map((file) => {
        if (file.fieldname === 'thumbnail') {
          thumbnailListFiles = file.location;
          return;
        }
        if (file.fieldname === 'sizeChart') {
          sizeChartFiles = file.location;
          return;
        }
        if (file.fieldname === 'bannerImage') {
          bannerImageFiles = file.location;
          return;
        }
        if (file.fieldname === 'productImage[]') {
          productImagefiles.push(file.location);
        }
      });
    }

    // Update product details in the database
    const updateProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        productTitle,
        description,
        discountPrice: parseInt(discountPrice),
        styleCode,
        price: parseInt(price),
        rating: parseFloat(rating),
        thumbnail: thumbnailListFiles,
        bannerImage: bannerImageFiles,
        categoriesId,
        fabric,
        wash,
        fit,
        sizeChart: sizeChartFiles,
        fabrics: fabrics,
        productimage: productImagefiles,
      },
    });

    // Respond with success message
    res.status(201).json({
      message: 'Product updated successfully with Images',
      updateProduct,
    });
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// Api to delete a product....................................................................................................
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    // Delete product from database
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
    // Respond with success message
    res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api to deactivate a product...............................................................................................
const deactivateProduct = async (req, res) => {
  const ID = req.params.id;
  try {
    // Find product by ID
    const findProduct = await prisma.product.findFirst({
      where: {
        id: ID,
      },
    });
    // Update product status to inactive
    await prisma.product.update({
      where: {
        id: findProduct.id,
      },
      data: {
        isActive: !findProduct.isActive,
      },
    });
    // Retrieve updated product details
    const deactivatedProduct = await prisma.product.findFirst({
      where: {
        id: findProduct.id,
      },
    });
    // Respond with success message
    return res.status(200).json({
      deactivatedProduct,
      message: 'Product deactivated successfully',
    });
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api to toggle product banner status.........................................................................................
const productBannerToggle = async (req, res) => {
  const { productId } = req.params;
  try {
    // Find product by ID
    const findProduct = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    // Update product banner status
    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        isbannerImage: !findProduct.isbannerImage,
      },
    });

    // Respond with updated product
    res.status(200).send(product);
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api to toggle product featured status........................................................................................
const productFeaturedToggle = async (req, res) => {
  const { productId } = req.params;
  try {
    // Find product by ID
    const findProduct = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    // Update product featured status
    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        featuredProduct: !findProduct.featuredProduct,
      },
    });

    // Respond with updated product
    res.status(200).send(product);
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api to create a new product stock entry......................................................................................
const createProductStock = async (req, res) => {
  const { size, color, quantity, productId, waist, bust, hip, shoulder } =
    req.body;
  try {
    // Create new product stock entry in the database
    const newProductStock = await prisma.productStock.create({
      data: {
        size,
        color,
        quantity,
        productId,
      },
    });
    // Respond with created product stock entry
    res.status(200).json(newProductStock);
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api to update product stock entry...............................................................................................
const updateProductStock = async (req, res) => {
  const { id, size, color, quantity, productId, waist, bust, hip, shoulder } =
    req.body;
  try {
    // Update product stock entry in the database
    const updateProductStock = await prisma.productStock.update({
      where: {
        id: id,
      },
      data: {
        size,
        color,
        quantity,
        quantity: parseInt(quantity),
      },
    });
    // Respond with updated product stock entry
    res.status(200).json(updateProductStock);
  } catch (error) {
    // Handle internal server error
    console.log(error);
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api to get product stock by ID..............................................................................................
const getProductStockById = async (req, res) => {
  const { id } = req.params;
  try {
    // Retrieve product stock entry by ID
    const productStock = await prisma.productStock.findUnique({
      where: {
        id: id,
      },
    });
    // Respond with product stock entry
    res.status(200).json(productStock);
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Function to delete product stock entry by ID
const deleteProductStockById = async (req, res) => {
  const { id } = req.params;
  try {
    // Delete product stock entry from the database
    const productStock = await prisma.productStock.delete({
      where: {
        id: id,
      },
    });
    // Respond with deleted product stock entry
    res.status(200).json(productStock);
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Exporting functions.........................................................................................................
module.exports = {
  deactivateProduct,
  deleteProduct,
  createNewProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  getAllProductsList,
  productBannerToggle,
  productFeaturedToggle,
  createProductStock,
  updateProductStock,
  getProductStockById,
  deleteProductStockById,
};
