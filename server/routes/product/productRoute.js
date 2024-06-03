// Router for managing product-related routes
const express = require('express');
const router = express.Router();
const productController = require('./../../controller/product/productController');
const upload = require('./../../middlewares/multerS3Upload');
const verifyJwt = require('./../../middlewares/verifiyJwt');

// Route to get all products within a specific category...........................................................
router.get('/getAllProducts/:categoriesName', productController.getAllProducts);

// Route to get a single product by its ID........................................................................
router.get('/getProduct/:productId', productController.getProduct);

// Route to create a new product..................................................................................
router.post(
  '/createNewProduct',
  // verifyJwt,
  upload.any(),
  productController.createNewProduct
);

// Route to get a list of products based on search criteria, pagination, and filters..............................
router.get('/allProductsList/', productController.getAllProductsList);

// Route to update an existing product............................................................................
router.put(
  '/updateProduct/:id',
  verifyJwt,
  upload.any(),
  productController.updateProduct
);

// Route to delete a product by its ID............................................................................
router.delete('/deleteProduct/:id', verifyJwt, productController.deleteProduct);

// Route to deactivate a product by its ID........................................................................
router.delete('/deactivateProduct/:id', productController.deactivateProduct);

// Route to toggle the banner status of a product by its ID.......................................................
router.get(
  '/bannerToggle/:productId',
  verifyJwt,
  productController.productBannerToggle
);

// Route to toggle the featured status of a product by its ID....................................................
router.get(
  '/featuredToggle/:productId',
  verifyJwt,
  productController.productFeaturedToggle
);

// Route to create a new product stock entry.....................................................................
router.post(
  '/createProductStock',
  verifyJwt,
  productController.createNewProduct
);

// Route to update an existing product stock entry...............................................................
router.post(
  '/updateProductStock',
  verifyJwt,
  productController.updateProductStock
);

// Route to get a single product stock entry by its ID...........................................................
router.get('/getProductStockById/:id', productController.getProductStockById);

// Route to delete a product stock entry by its ID...............................................................
router.delete(
  '/deleteProductStock/:id',
  verifyJwt,
  productController.deleteProductStockById
);

module.exports = router;
