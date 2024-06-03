const prisma = require('../../config/db');

// Api to create a new category.................................................................................
const createNewCategories = async (req, res) => {
  try {
    // Extract category name from request body
    const { catName } = req.body;

    // Check if category name is provided
    if (!catName)
      return res
        .status(400)
        .json({ message: 'Please enter all fields details!' });

    // Get image URL from the first file in the request
    const imageUrl = req.files[0].location;

    // Create new category using Prisma
    const createCategories = await prisma.categories.create({
      data: {
        catName,
        image: imageUrl,
      },
    });

    // Return the created category
    res.status(201).json(createCategories);
  } catch (err) {
    // Handle any errors and send an appropriate response
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// Api to Get all category.................................................................................
const getAllCategories = async (req, res) => {
  try {
    // Destructure query parameters
    let { search, active, page, pageSize } = req.query;

    // Convert active query parameter to boolean if provided
    if (active !== undefined) {
      if (active === 'false') {
        active = false;
      } else if (active === 'true') {
        active = true;
      }
    }

    // Fetch categories from the database based on search, active status, and pagination
    const categories = await prisma.categories.findMany({
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

    // Check if any categories are retrieved
    if (!categories) {
      return res.status(404).json({ message: 'No categories found!' });
    }

    // Retrieve the total count of categories
    const totalCategories = await prisma.categories.count({});

    // Return the retrieved categories and total count
    res.status(200).json({
      message: 'Categories retrieved successfully!',
      categories,
      totalCategories,
    });
  } catch (error) {
    // Handle any errors
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error!', error });
  }
};

// Api to Get category By Its Id.................................................................................
const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    // Fetch the category from the database based on its ID
    const category = await prisma.categories.findFirst({
      where: {
        id: categoryId,
      },
    });

    // Check if the category exists
    if (!category) {
      return res.status(404).json({ message: 'Category not found!' });
    }

    // Return the retrieved category
    res
      .status(200)
      .json({ message: 'Category retrieved successfully!', category });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

//Api to Update a category based on its ID.......................................................................
const updateCategorie = async (req, res) => {
  const categorieId = req.params.id;
  const { catName } = req.body;

  // Check if there are any image files attached
  if (req.files.length == 0) {
    try {
      // Update category without changing the image
      const updateCategorie = await prisma.categories.update({
        where: {
          id: categorieId,
        },
        data: {
          catName: catName,
        },
      });
      if (!updateCategorie) {
        return res.status(404).json({ message: 'Something went wrong!' });
      }
      res
        .status(200)
        .json({ message: 'Category updated successfully!', updateCategorie });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error!' });
    }
  } else {
    // If there are image files attached
    const imageUrl = req.files[0].location;
    try {
      // Update category with new image
      const updateCategorie = await prisma.categories.update({
        where: {
          id: categorieId,
        },
        data: {
          catName: catName,
          image: imageUrl,
        },
      });
      if (!updateCategorie) {
        return res.status(404).json({ message: 'Something went wrong!' });
      }
      res
        .status(200)
        .json({ message: 'Category updated successfully!', updateCategorie });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error!' });
    }
  }
};

//Api to Delete a category based on its ID......................................................................
const deleteCategorie = async (req, res) => {
  const deleteId = req.params.id;

  try {
    // Find the category by ID
    const getCategories = await prisma.categories.findFirst({
      where: {
        id: deleteId,
      },
    });
    if (!getCategories) {
      return res.status(404).json({ message: 'Something went wrong!' });
    }
    // Update the isActive status of the category to deactivate it
    const deleteCategorie = await prisma.categories.update({
      where: {
        id: deleteId,
      },
      data: {
        isActive: !getCategories.isActive,
      },
    });
    res
      .status(203)
      .json({ message: 'Deleted categories successfully!', deleteCategorie });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

module.exports = {
  createNewCategories,
  getAllCategories,
  getCategoryById,
  updateCategorie,
  deleteCategorie,
};
