import express from 'express';
import AuthController from '../../../controllers/AuthController';
import Middleware from '../../../middleware';
import API_ROUTES from '../../routes';
import UserValidation from '../../../validation/UserValidation';

const AuthRouter = express.Router();

AuthRouter.post(API_ROUTES.LOGIN, [UserValidation.login, Middleware.Guest], AuthController.login);

export default AuthRouter;
