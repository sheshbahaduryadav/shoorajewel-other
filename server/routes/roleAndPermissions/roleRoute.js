const express = require('express');
const roleController = require('../../controller/roleAndPermission/roleController');
// const permissions = require('./../middleware/verifyRoute');
const router = express.Router();

router.post(
  '/createRoles',
  //   permissions({ route: 'CREATE_ROLE' }),
  roleController.userCreateRole
);

router.get(
  '/getAllRoles',
  //   permissions({ route: 'GET_ALL_ROLES' }),
  roleController.userGetAllRoles
);

router.get('/getAllUserByRoleId/:id', roleController.getAllUserByRoleId);

router.patch('/updateRole/:roleId', roleController.updateRole);
router.delete('/deleteRole/:id', roleController.deleteRole);

module.exports = router;
