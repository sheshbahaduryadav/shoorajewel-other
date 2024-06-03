const prisma = require('../../config/db');

// Api to create a new product.................................................................................
const createNewProduct = async (req, res) => {
  try {
    // Destructuring product details from request body
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

    // Logging request body for debugging
    console.log('body==', req.body);

    // Checking if required fields are provided
    if (!productTitle || !description || !price) {
      return res.status(400).json({ message: 'All Fields are mandatory!' });
    }

    // Checking if files are uploaded
    if (req.files) {
      let thumbnailList = '';
      let bannerImage = '';
      let sizeChart = '';
      let productImage = [];

      // Mapping through uploaded files to assign them to respective variables
      req.files.map((file) => {
        if (file.fieldname === 'thumbnail') {
          thumbnailList = file.location;
          return;
        }
      });

      req.files.map((file) => {
        if (file.fieldname === 'bannerImage') {
          bannerImage = file.location;
          return;
        }
      });

      req.files.map((file) => {
        if (file.fieldname === 'sizeChart') {
          sizeChart = file.location;
          return;
        }
      });

      req.files.map((file) => {
        if (file.fieldname === 'productImage[]') {
          productImage.push(file.location);
        }
      });

      // Creating new product in the database
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
          productImage: productImage,
        },
      });

      // Adding product stock details to the database
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

      // Sending success response with created product details
      res.status(201).json(createProduct);
    } else {
      // Sending error response if no image is uploaded
      res.json({ message: 'Please Insert Product Image!' });
    }
  } catch (err) {
    // Handling internal server errors
    console.log(err);
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api to get all products based on a specific category name..................................................
const getAllProducts = async (req, res) => {
  try {
    // Extracting category name from request parameters
    const categoriesName = req.params.categoriesName;

    // Finding details of the specified category from the database
    const categoriesDetail = await prisma.categories.findFirst({
      where: {
        catName: categoriesName,
      },
    });

    // Finding all products belonging to the specified category
    const getAllProducts = await prisma.product.findMany({
      where: {
        categoriesId: categoriesDetail.id,
      },
      include: {
        categories: true, // Including category details in the response
        ProductStock: true, // Including product stock details in the response
      },
    });

    // Checking if any products are found
    if (!getAllProducts) {
      return res.status(404).json({ message: 'Products are not found' });
    }

    // Counting total number of products
    const totalProducts = await prisma.product.count({});

    // Sending response with all products and total count
    res.status(200).json({
      message: 'Get All Products Successfully!',
      getAllProducts,
      totalProducts,
    });
  } catch (error) {
    // Handling internal server errors
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// Api to get a list of products based on search criteria and pagination......................................
const getAllProductsList = async (req, res) => {
  try {
    // Destructuring query parameters from the request
    let { search, active, banner, featured, page, pageSize } = req.query;
    // Convert page and pageSize to integers
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    // Converting 'active' query parameter to boolean if it exists
    if (active !== undefined) {
      if (active === 'false') {
        active = false;
      } else if (active === 'true') {
        active = true;
      }
    }

    // Querying the database to find products based on search criteria and filters
    const getAllProducts = await prisma.product.findMany({
      where: {
        AND: [
          {
            productTitle: {
              startsWith: search, // Searching by product title starting with the provided string
              mode: 'insensitive', // Case-insensitive search
            },
          },
          { isActive: active }, // Filtering by active status
          { isbannerImage: banner }, // Filtering by banner image status
          { featuredProduct: featured }, // Filtering by featured product status
        ],
      },
      include: {
        categories: true, // Including category details in the response
        ProductStock: true, // Including product stock details in the response
      },
      // skip: (page - 1) * pageSize, // Pagination: Calculating skip based on page number and page size
      // take: parseInt(pageSize), // Pagination: Limiting number of results per page
    });

    // Counting total number of products
    const totalProducts = await prisma.product.count({});

    // Checking if any products are found
    if (!getAllProducts) {
      return res.status(404).json({ message: 'Products are not found' });
    }

    // Sending response with all products and total count
    res.status(200).json({
      message: 'Get All Products Successfully!',
      getAllProducts,
      totalProducts,
    });
  } catch (error) {
    // Handling internal server errors
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// Api to retrieve details of a specific product by its ID.........................................................
const getProduct = async (req, res) => {
  const { productId } = req.params; // Extracting the product ID from the request parameters

  try {
    // Querying the database to find the product by its ID and including related categories and product stock
    const getProduct = await prisma.product.findFirst({
      where: {
        id: productId,
      },
      include: {
        categories: true, // Including category details in the response
        ProductStock: true, // Including product stock details in the response
      },
    });

    // Checking if the product is found
    if (!getProduct) {
      return res.status(404).json({ message: 'This product is not found' });
    }

    // Sending the product details in the response
    res.status(200).send(getProduct);
  } catch (error) {
    // Handling internal server errors
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// Api to update product details, including images...................................................................
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id; // Extracting the product ID from request parameters
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
    } = req.body; // Extracting updated product details from request body

    let thumbnailListFiles = ''; // Variable to store updated thumbnail image URL
    let bannerImageFiles = ''; // Variable to store updated banner image URL
    let sizeChartFiles = ''; // Variable to store updated size chart image URL
    let productImagefiles = []; // Array to store updated product image URLs

    // Finding the existing product details from the database
    const oldProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    // Assigning existing image URLs to variables
    thumbnailListFiles = oldProduct.thumbnail;
    bannerImageFiles = oldProduct.bannerImage;
    productImagefiles = oldProduct.productimage;

    // Checking if new files are uploaded
    if (req.files.length !== 0) {
      // Iterating through uploaded files to update image URLs based on file fieldname
      req.files.map((file) => {
        if (file.fieldname === 'thumbnail') {
          thumbnailListFiles = file.location;
          return;
        }
      });

      req.files.map((file) => {
        if (file.fieldname === 'sizeChart') {
          sizeChartFiles = file.location;
          return;
        }
      });

      req.files.map((file) => {
        if (file.fieldname === 'bannerImage') {
          bannerImageFiles = file.location;
          return;
        }
      });

      req.files.map((file) => {
        if (file.fieldname === 'productImage[]') {
          productImagefiles.push(file.location);
        }
      });
    }

    // Updating the product details in the database
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
        bannerImage: bannerImageFiles,
        productimage: productImagefiles,
      },
    });

    // Sending success message and updated product details in the response
    res.status(201).json({
      message: 'Successfully Product updated with Images',
      updateProduct,
    });
  } catch (error) {
    // Handling internal server errors
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// Api to delete a product from the database.........................................................................
const deleteProduct = async (req, res) => {
  const id = req.params.id; // Extracting the product ID from request parameters
  try {
    // Deleting the product using the product ID
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
    // Sending success message in response after successful deletion
    res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (error) {
    // Handling internal server errors
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api to deactivate a product.......................................................................................
const deactivateProduct = async (req, res) => {
  const ID = req.params.id; // Extracting the product ID from request parameters
  try {
    // Finding the product by ID
    const findProduct = await prisma.product.findFirst({
      where: {
        id: ID,
      },
    });
    // Updating the isActive field of the product to its opposite value
    await prisma.product.update({
      where: {
        id: findProduct.id,
      },
      data: {
        isActive: !findProduct.isActive,
      },
    });
    // Fetching the updated product after deactivation
    const deactivatedProduct = await prisma.product.findFirst({
      where: {
        id: findProduct.id,
      },
    });
    // Returning the deactivated product and success message in the response
    return res.status(200).json({
      deactivatedProduct,
      message: 'Product deactivated successfully',
    });
  } catch (error) {
    // Handling internal server errors
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api to toggle the banner status of a product.....................................................................
const productBannerToggle = async (req, res) => {
  const { productId } = req.params; // Extracting the product ID from request parameters
  try {
    // Finding the product by ID
    const findProduct = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    // Updating the isbannerImage field of the product to its opposite value
    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        isbannerImage: !findProduct.isbannerImage,
      },
    });

    // Sending the updated product in the response
    res.status(200).send(product);
  } catch (error) {
    // Handling internal server errors
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api to toggle the featured status of a product...................................................................
const productFeaturedToggle = async (req, res) => {
  const { productId } = req.params; // Extracting the product ID from request parameters
  try {
    // Finding the product by ID
    const findProduct = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    // Updating the featuredProduct field of the product to its opposite value
    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        featuredProduct: !findProduct.featuredProduct,
      },
    });

    // Sending the updated product in the response
    res.status(200).send(product);
  } catch (error) {
    // Handling internal server errors
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Controller function to create new product stock...................................................................
const createProductStock = async (req, res) => {
  const { size, color, quantity, productId, waist, bust, hip, shoulder } =
    req.body; // Extracting product stock data from request body
  try {
    // Creating new product stock entry in the database
    const newProductStock = await prisma.productStock.create({
      data: {
        size,
        color,
        quantity,
        productId,
      },
    });
    // Sending the newly created product stock data in the response
    res.status(200).json(newProductStock);
  } catch (error) {
    // Handling internal server errors
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api to update product stock........................................................................................
const updateProductStock = async (req, res) => {
  // Destructuring product stock data from request body
  const { id, size, color, quantity, productId, waist, bust, hip, shoulder } =
    req.body;
  try {
    // Updating product stock entry in the database
    const updateProductStock = await prisma.productStock.update({
      where: {
        id: id, // Finding product stock entry by its ID
      },
      data: {
        size, // Updating size
        color, // Updating color
        quantity: parseInt(quantity), // Parsing quantity to integer and updating
      },
    });
    // Sending updated product stock data in the response
    res.status(200).json(updateProductStock);
  } catch (error) {
    console.log(error);
    // Handling internal server errors
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api to retrieve product stock by ID...............................................................................
const getProductStockById = async (req, res) => {
  // Extracting the product stock ID from the request parameters
  const { id } = req.params;
  try {
    // Querying the database to find the product stock entry by its ID
    const productStock = await prisma.productStock.findUnique({
      where: {
        id: id,
      },
    });
    // Sending the product stock data in the response
    res.status(200).json(productStock);
  } catch (error) {
    // Handling internal server errors
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api to delete product stock by ID.................................................................................
const deleteProductStockById = async (req, res) => {
  // Extracting the product stock ID from the request parameters
  const { id } = req.params;
  try {
    // Deleting the product stock entry from the database based on its ID
    const productStock = await prisma.productStock.delete({
      where: {
        id: id,
      },
    });
    // Sending the deleted product stock data in the response
    res.status(200).json(productStock);
  } catch (error) {
    // Handling internal server errors
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Exporting various controller functions related to managing products and product stocks...............................
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
