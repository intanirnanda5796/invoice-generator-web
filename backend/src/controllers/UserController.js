import UserService from '../services/UserService';
import response from '../utils/response';

class UserController {
  static create = async (req, res) => {
    try {
      const {
        fullname, email, password, phoneNumber, address, role,
      } = req.body;

      const result = await UserService.createUser({
        fullname, password, email, phoneNumber, address, role,
      });

      delete result.dataValues.password;

      return res.status(200).json(response.success(result));
    } catch (err) {
      const getError = response.errors(err);
      return res.status(getError.code).json(getError);
    }
  };

  static list = async (req, res) => {
    try {
      const result = await UserService.listUser();

      return res.status(200).json(response.success(result));
    } catch (err) {
      const getError = response.errors(err);
      return res.status(getError.code).json(getError);
    }
  };

  static delete = async (req, res) => {
    try {
      const { id } = req.params;

      await UserService.deleteUser({ id });

      return res.status(200).json(response.success(null, null, `delete user with ${id} success`));
    } catch (err) {
      const getError = response.errors(err);
      return res.status(getError.code).json(getError);
    }
  };

  static buyer = async (req, res) => {
    try {
      const result = await UserService.listBuyer();

      return res.status(200).json(response.success(result));
    } catch (err) {
      const getError = response.errors(err);
      return res.status(getError.code).json(getError);
    }
  };
}

export default UserController;
