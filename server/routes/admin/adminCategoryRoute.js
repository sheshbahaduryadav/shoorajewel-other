const express = require('express');
const router = express.Router();
const categoriesController = require('./../../controller/admin/adminCategoryController');
const upload = require('../../middlewares/multerS3Upload');
const verifyJwt = require('./../../middlewares/verifiyJwt');

// Route to create a new category, protected by JWT verification middleware, and handles file uploads
router.post(
  '/admin/categorie/creation',
  verifyJwt,
  upload.any(),
  categoriesController.createNewCategories
);

// Route to get all categories (listing all categories)
router.get('/admin/categories', categoriesController.getAllCategories);

// Route to get details of a specific category by its ID
router.get('/admin/categorie/:id', categoriesController.getCategories);

// Route to update a specific category by its ID, protected by JWT verification middleware, and handles file uploads
router.put(
  '/admin/categorie/update/:id',
  verifyJwt,
  upload.any(),
  categoriesController.updateCategorie
);

// Route to delete a specific category by its ID, protected by JWT verification middleware
router.delete(
  '/admin/categorie/delete/:id',
  verifyJwt,
  categoriesController.deleteCategorie
);

module.exports = router;
