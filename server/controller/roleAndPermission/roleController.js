const prisma = require('../../config/db');
require('dotenv').config();

const userCreateRole = async (req, res) => {
  try {
    const { name, rank } = req.body;
    const uppercaseRoleName = name.toUpperCase();
    let createData = {
      name: uppercaseRoleName,
      rank: parseInt(rank),
    };
    const findDuplicateRole = await prisma.role.findMany({
      where: {
        name: uppercaseRoleName,
        rank: parseInt(rank),
      },
    });

    console.log(findDuplicateRole);
    //console.log('findDuplicate');
    if (findDuplicateRole.length > 0) {
      return res.status(404).json({ message: 'Rank already exists!' });
    }
    const roleIdCount = await prisma.role.count();
    const roleId = `R${(roleIdCount + 1).toString().padStart(3, '0')}`;
    const role = await prisma.role.create({
      data: {
        ...createData,
        roleId: roleId,
      },
    });
    //console.log(role);
    res.status(200).json(role);
  } catch (error) {
    //console.log(error);
    res.status(500).json({ message: 'Internal server error!' });
  }
};

const userGetAllRoles = async (req, res) => {
  try {
    const { search, page = 1, pageSize = 10 } = req.query;
    const roles = await prisma.role.findMany({
      where: {
        name: {
          search: search ? search.toLowerCase() : undefined,
        },
      },
      orderBy: {
        rank: 'asc',
      },
      skip: (page - 1) * pageSize,
      take: parseInt(pageSize),
    });
    res.status(200).json(roles);
  } catch (error) {
    //console.log(error);
    res.status(500).json({ message: 'Internal server error!' });
  }
};

const getAllUserByRoleId = async (req, res) => {
  try {
    const roleId = req.params.id;
    console.log('roleId is ====>', roleId);

    const user = await prisma.user.findMany({
      where: {
        roleId: roleId,
      },
    });
    console.log('getAllUserByRoleId', user);
    res.status(200).json({
      user,
      message: 'Successfull!',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error!' });
  }
};

const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;

    // Check if the role exists before attempting to delete
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    await prisma.role.delete({
      where: {
        id: roleId,
      },
    });

    return res.status(204).json({ message: 'Role deleted successfully' });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

const updateRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { name, rank, staffId } = req.body;

    // Check if the role exists in the organization
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      return res
        .status(404)
        .json({ message: 'Role does not exist in this organization' });
    }

    // Check if the staffId exists
    const user = await prisma.user.findUnique({
      where: {
        id: staffId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    // Update the role with the new name, rank, and connect the user
    await prisma.role.update({
      where: {
        id: roleId,
      },
      data: {
        name,
        rank,
        user: {
          connect: {
            id: staffId,
          },
        },
      },
    });

    // Return success message
    res.status(200).json({ message: 'Role updated successfully' });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  userCreateRole,
  userGetAllRoles,
  getAllUserByRoleId,
  deleteRole,
  updateRole,
};
