const prisma = require('../../config/db');

// Api to create new categories.....................................................................................
const createNewCategories = async (req, res) => {
  try {
    const { catName } = req.body;

    // Check if catName is provided
    if (!catName)
      return res
        .status(400)
        .json({ message: 'Please enter all fields details!' });

    // Extract image URL from request
    const imageUrl = req.files[0].location;

    // Create new category
    const createCategories = await prisma.categories.create({
      data: {
        catName,
        image: imageUrl,
      },
    });
    res.status(201).json(createCategories); // Respond with created category
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// Api to get all categories with pagination and search.....................................................................................
const getAllCategories = async (req, res) => {
  try {
    let { search, active, page, pageSize } = req.query;

    // Convert 'active' query param to boolean if provided
    if (active !== undefined) {
      if (active === 'false') {
        active = false;
      } else if (active === 'true') {
        active = true;
      }
    }

    // Retrieve categories based on search and active status with pagination
    const getAllCategories = await prisma.categories.findMany({
      where: {
        AND: {
          catName: {
            startsWith: search,
            mode: 'insensitive',
          },
          isActive: active,
        },
      },
      skip: (page - 1) * pageSize,
      take: parseInt(pageSize),
    });

    // Check if categories are found
    if (!getAllCategories) {
      return res.status(404).json({ message: 'Something went wrong!' });
    }

    // Retrieve total count of categories
    const totalCategories = await prisma.categories.count({});

    // Respond with categories and total count
    res.status(200).json({
      message: 'Get All Categories successfully!',
      getAllCategories,
      totalCategories,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// Api to get a single category by ID.........................................................................................
const getCategories = async (req, res) => {
  const categoryId = req.params.id;

  try {
    // Retrieve category by ID
    const getCategory = await prisma.categories.findFirst({
      where: {
        id: categoryId,
      },
    });

    // Check if category is found
    if (!getCategory) {
      return res.status(404).json({ message: 'Something went wrong!' });
    }

    // Respond with the category
    res
      .status(200)
      .json({ message: 'Get Category successfully!', getCategory });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// Api to update a category.....................................................................................
const updateCategorie = async (req, res) => {
  const categoryId = req.params.id;
  const { catName } = req.body;

  // Check if image is not provided
  if (req.files.length == 0) {
    try {
      // Update category name
      const updateCategory = await prisma.categories.update({
        where: {
          id: categoryId,
        },
        data: {
          catName: catName,
        },
      });

      // Check if category is updated
      if (!updateCategory) {
        return res.status(404).json({ message: 'Something went wrong!' });
      }

      // Respond with the updated category
      res
        .status(200)
        .json({ message: 'Category updated successfully!', updateCategory });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error!' });
    }
  } else {
    // If image is provided
    const imageUrl = req.files[0].location;
    try {
      // Update category with image
      const updateCategory = await prisma.categories.update({
        where: {
          id: categoryId,
        },
        data: {
          catName: catName,
          image: imageUrl,
        },
      });

      // Check if category is updated
      if (!updateCategory) {
        return res.status(404).json({ message: 'Something went wrong!' });
      }

      // Respond with the updated category
      res
        .status(200)
        .json({ message: 'Category updated successfully!', updateCategory });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error!' });
    }
  }
};

// Api to delete a category.............................................................................................
const deleteCategorie = async (req, res) => {
  const deleteId = req.params.id;

  try {
    // Find category by ID
    const getCategory = await prisma.categories.findFirst({
      where: {
        id: deleteId,
      },
    });

    // Check if category is found
    if (!getCategory) {
      return res.status(404).json({ message: 'Something went wrong!' });
    }

    // Update isActive status to delete/undelete the category
    const deleteCategory = await prisma.categories.update({
      where: {
        id: deleteId,
      },
      data: {
        isActive: !getCategory.isActive,
      },
    });

    // Respond with the deleted/undeleted category
    res
      .status(203)
      .json({ message: 'Deleted categories successfully!', deleteCategory });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// Exporting functions
module.exports = {
  createNewCategories,
  getAllCategories,
  getCategories,
  updateCategorie,
  deleteCategorie,
};
