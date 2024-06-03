const express = require('express');
const router = express.Router();
const categoriesController = require('./../../controller/product/categoriesController');
const upload = require('./../../middlewares/multerS3Upload');
const verifyJwt = require('./../../middlewares/verifiyJwt');

// Route to create a new category
router.post(
  '/creation',
  //   verifyJwt,
  upload.any(),
  categoriesController.createNewCategories
);

// Route to get all categories
router.get('/AllCategories', categoriesController.getAllCategories); //categories listing

// Route to get details of a specific category
router.get('/getCategorie/:id', categoriesController.getCategoryById); //categorie details

// Route to update a category
router.put(
  '/updateCategorie/:id',
  //   verifyJwt,
  upload.any(),
  categoriesController.updateCategorie
); //categorie update

// Route to delete a category
router.delete(
  '/deleteCategorie/:id',
  //   verifyJwt,
  categoriesController.deleteCategorie
); //categorie deletion

module.exports = router;
