import express from 'express';
import Middleware from '../../../middleware';
import API_ROUTES from '../../routes';
import InvoiceController from '../../../controllers/InvoiceController';
import InvoiceValidation from '../../../validation/InvoiceValidation';

const InvoiceRouter = express.Router();

InvoiceRouter.post(API_ROUTES.CREATE_INVOICE, [InvoiceValidation.create, Middleware.Auth, Middleware.Authorize('SELLERS')], InvoiceController.create);
InvoiceRouter.get(API_ROUTES.LIST_INVOICE, [Middleware.Auth, Middleware.Authorize('BUYERS')], InvoiceController.list);
InvoiceRouter.get(API_ROUTES.SHOW_INVOICE, [InvoiceValidation.show, Middleware.Auth, Middleware.Authorize('BUYERS')], InvoiceController.viewInvoice);
InvoiceRouter.get(API_ROUTES.LIST_SELLER_INVOICE, [Middleware.Auth, Middleware.Authorize('SELLERS')], InvoiceController.listInvoiceSeller);
InvoiceRouter.delete(API_ROUTES.DELETE_INVOICE, [Middleware.Auth, Middleware.Authorize('SELLERS')], InvoiceController.delete);

export default InvoiceRouter;
