import { Op } from 'sequelize';
import ERRORS from '../config/errors';
import User from '../models/User';
import { generatedHash } from '../utils/encryption';

class UserService {
  static createUser = async ({
    fullname, password, email, phoneNumber, address, role,
  }) => {
    const result = await User.create({
      fullname,
      password: generatedHash(password),
      email,
      phone_number: phoneNumber,
      address,
      role,
    });

    return result;
  };

  static listUser = async () => {
    const result = await User.findAll({
      where: {
        role: {
          [Op.ne]: 'ADMIN',
        },
      },
    });
    return result;
  };

  static listBuyer = async () => {
    const result = await User.findAll({
      where: {
        role: 'BUYERS',
      },
    });

    return result;
  };

  static deleteUser = async ({ id }) => {
    const checkUser = await User.findByPk(id);
    if (!checkUser) {
      throw ERRORS.USER_NOT_EXIST;
    }

    const result = await User.destroy({ where: { id } });
    return result;
  };
}

export default UserService;
