const express = require('express');
const router = express.Router();
const productController = require('../../controller/admin/adminProductController');
const upload = require('../../middlewares/multerS3Upload');
const verifyJwt = require('../../middlewares/verifiyJwt');

// Route to get all products by category name
router.get('/products/:categoriesName', productController.getAllProducts);

// Route to get a specific product by its ID
router.get('/product/:productId', productController.getProduct);

// Route to create a new product, protected by JWT verification and using multer for file uploads
router.post(
  '/product/creation',
  verifyJwt,
  upload.any(),
  productController.createNewProduct
);

// Route to get a list of all products
router.get('/products/', productController.getAllProductsList);

// Route to update a product by its ID, protected by JWT verification and using multer for file uploads
router.put(
  '/product/update/:id',
  verifyJwt,
  upload.any(),
  productController.updateProduct
);

// Route to delete a product by its ID, protected by JWT verification
router.delete(
  '/adminProducts/deleteProduct/:id',
  verifyJwt,
  productController.deleteProduct
);

// Route to deactivate a product by its ID
router.delete(
  '/adminProducts/deactivateProduct/:id',
  productController.deactivateProduct
);

// Route to toggle the banner status of a product by its ID, protected by JWT verification
router.get(
  '/adminProducts/bannerToggle/:productId',
  verifyJwt,
  productController.productBannerToggle
);

// Route to toggle the featured status of a product by its ID, protected by JWT verification
router.get(
  '/adminProducts/featuredToggle/:productId',
  verifyJwt,
  productController.productFeaturedToggle
);

// Route to create new product stock, protected by JWT verification
router.post(
  '/createProductStock',
  verifyJwt,
  productController.createNewProduct
);

// Route to update product stock, protected by JWT verification
router.post(
  '/updateProductStock',
  verifyJwt,
  productController.updateProductStock
);

// Route to get product stock by its ID
router.get('/getProductStockById/:id', productController.getProductStockById);

// Route to delete product stock by its ID, protected by JWT verification
router.delete(
  '/deleteProductStock/:id',
  verifyJwt,
  productController.deleteProductStockById
);

module.exports = router;
