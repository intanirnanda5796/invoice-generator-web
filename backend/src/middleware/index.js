import { validationResult } from 'express-validator';
import response from '../utils/response';
import AuthMiddleware from './auth';

class Middleware {
  static Guest = (req, res, next) => this.handler('guest', req, res, next);

  static Auth = (req, res, next) => this.handler('auth', req, res, next);

  static handler = (type, req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const uniqueArr = [...new Set(errors.array().map((data) => data.param))];
      const arr = uniqueArr.reduce((val, key) => ({ ...val, [key]: '' }), {});
      for (let i = 0; i < errors.array().length; i += 1) {
        if (errors.array()[i + 1]) {
          if (errors.array()[i].param === errors.array()[i + 1].param) {
            arr[errors.array()[i].param] = errors.array()[i].msg.concat(', ', errors.array()[i + 1].msg);
          }
        } else {
          arr[errors.array()[i].param] = errors.array()[i].msg;
        }
      }

      return res.status(400).json(response.errors(arr));
    }

    switch (type) {
      case 'guest': return next();
      case 'auth': return AuthMiddleware(req, res, next);
      default: return res.status(403);
    }
  };

  static Authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.decoded.decode.role)) {
      return res.status(400).json(response.errors(`User with role ${req.decoded.decode.role} not authorized to this api`));
    }

    return next();
  };
}

export default Middleware;
