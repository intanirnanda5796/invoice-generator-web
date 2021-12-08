import User from '../models/User';
import { generatedHash, compareHash } from '../utils/encryption';
import ERRORS from '../config/errors';

class AuthService {
  static processRegister = async ({
    fullname, password, email, phoneNumber, address,
  }) => {
    const result = await User.create({
      fullname,
      password: generatedHash(password),
      email,
      phone_number: phoneNumber,
      address,
    });

    return result;
  };

  static processLogin = async ({ email, password }) => {
    const result = await User.findOne({
      where: { email },
    });
    if (!result) {
      throw ERRORS.EMAIL_NOT_EXIST.replace(':email', email);
    }

    if (!compareHash(password, result.password)) {
      throw ERRORS.WRONG_PASSWORD;
    }

    return result;
  };
}

export default AuthService;
