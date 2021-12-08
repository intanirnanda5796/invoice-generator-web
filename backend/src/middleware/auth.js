import Jwt from '../utils/jwt';

const AuthMiddleware = (req, res, next) => {
  const { headers: { authorization = undefined } } = req;

  const unauthorized = () => res.status(401).json({ message: 'Unauthorized' });

  if (!authorization) return unauthorized();

  const bearerAuth = (token) => {
    req.decoded = Jwt.verify(token);

    return next();
  };

  try {
    const [type, payload] = authorization.split(' ');

    switch (type) {
      case 'Bearer': return bearerAuth(payload);
      default: return unauthorized();
    }
  } catch (err) {
    return unauthorized();
  }
};

export default AuthMiddleware;
