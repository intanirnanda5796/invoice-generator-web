import express from 'express';
import API_ROUTES from '../../routes';
import Middleware from '../../../middleware';
import UserController from '../../../controllers/UserController';
import UserValidation from '../../../validation/UserValidation';

const UserRouter = express.Router();

UserRouter.post(API_ROUTES.CREATE_USER, [UserValidation.create, Middleware.Auth, Middleware.Authorize('ADMIN')], UserController.create);
UserRouter.get(API_ROUTES.LIST_USER, [Middleware.Auth, Middleware.Authorize('ADMIN')], UserController.list);
UserRouter.delete(API_ROUTES.DELETE_USER, [UserValidation.delete, Middleware.Auth, Middleware.Authorize('ADMIN')], UserController.delete);
UserRouter.get(API_ROUTES.LIST_BUYER, [Middleware.Auth, Middleware.Authorize('SELLERS')], UserController.buyer);

export default UserRouter;
