const prisma = require('../../config/db');
require('dotenv').config();

const createPermitedRoutes = async (req, res) => {
  try {
    const { staffId, routeName } = req.body;
    // //console.log('req.body====>1', req.body);
    const createdPermitedRoutes = [];
    const userStaff = await prisma.user.findUnique({
      where: { id: staffId },
    });
    if (!userStaff) {
      return res.status(404).json({
        message: 'Staff record not found',
      });
    }
    // Remove duplicates from permitedRoute array
    const uniquePermitedRoute = [...new Set(routeName)];

    let duplicateFound = false;
    for (let i = 0; i < uniquePermitedRoute.length; i++) {
      const permittedRoute = uniquePermitedRoute[i];

      // //console.log('permittedRoute===>', permittedRoute);
      // //console.log('permissionType====>', permissionType);
      // //console.log('R;name===>', Rname);
      // //console.log('linkRoute====>', linkRoute);

      const isDuplicatePermission = await prisma.permitedRoutes.findFirst({
        where: {
          routeName: permittedRoute,
          userId: staffId,
        },
      });
      // //console.log('isDuplicateError', isDuplicatePermission);
      if (isDuplicatePermission) {
        duplicateFound = true;
        // Continue loop to check for more duplicate
        continue;
      }

      const createdRoute = await prisma.permitedRoutes.create({
        data: {
          routeName: permittedRoute,
          user: {
            connect: {
              id: staffId,
            },
          },
        },
      });
      createdPermitedRoutes.push(createdRoute);
    }

    if (duplicateFound) {
      return res.status(400).json({
        message: 'Duplicate permissions found!',
      });
    }
    // If no duplicate found and loop completes, send success response
    res.status(201).json({
      message: 'Permited routes created successfully',
      createdPermitedRoutes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error!',
    });
  }
};

const deletePermitedRoutes = async (req, res) => {
  try {
    const { staffId, permitedRouteId } = req.params;
    //console.log('staffId', staffId, 'and permittedNames', permitedRouteId);

    const userStaff = await prisma.permitedRoutes.findUnique({
      where: { id: permitedRouteId, userId: staffId },
    });

    if (!userStaff) {
      return res.status(404).json({
        message: 'Staff record not found',
      });
    }

    // Find and delete multiple permitted routes
    const deletedRoutes = await prisma.permitedRoutes.delete({
      where: {
        id: permitedRouteId,
      },
    });

    if (deletedRoutes.count === 0) {
      return res.status(401).json({
        message: 'No matching permissions found for deletion',
      });
    }

    res.status(200).json({
      message: 'Permitted routes deleted successfully',
      deletedRoutes: deletedRoutes.count,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      message: 'Internal server error!',
    });
  }
};

const getPermittedRouteByStaffId = async (req, res) => {
  try {
    const staffId = req.params.id;
    const findPermittedRoute = await prisma.permitedRoutes.findMany({
      where: {
        id: staffId,
      },
    });
    res.status(200).json(findPermittedRoute);
  } catch (error) {
    //console.log(error);
    res.status(500).json({ message: 'Internal server error!' });
  }
};

module.exports = {
  createPermitedRoutes,
  getPermittedRouteByStaffId,
  deletePermitedRoutes,
};
