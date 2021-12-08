import response from '../utils/response';
import AuthService from '../services/AuthService';
import jwt from '../utils/jwt';

class AuthController {
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await AuthService.processLogin({ email, password });

      const token = jwt.sign({ id: result.id, role: result.role });

      delete result.dataValues.password;

      result.setDataValue('token', token);

      return res.status(200).json(response.success(result));
    } catch (err) {
      const getError = response.errors(err);
      return res.status(getError.code).json(getError);
    }
  };
}

export default AuthController;
