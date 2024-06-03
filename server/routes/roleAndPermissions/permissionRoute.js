const express = require('express');
const permissionsController = require('../../controller/roleAndPermission/permissionController');
// const permissions = require('./../middleware/verifyRoute');
const router = express.Router();

router.post(
  '/createPermissions',
  //   permissions({ route: 'CREATE_ROLE' }),
  permissionsController.createPermitedRoutes
);

router.get(
  '/getAllRoles',
  //   permissions({ route: 'GET_ALL_ROLES' }),
  permissionsController.getPermittedRouteByStaffId
);

router.delete(
  '/getAllRoles/:staffId/:permitedRouteId',
  //   permissions({ route: 'GET_ALL_ROLES' }),
  permissionsController.deletePermitedRoutes
);

module.exports = router;
