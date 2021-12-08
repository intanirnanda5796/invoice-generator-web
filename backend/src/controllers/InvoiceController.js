import response from '../utils/response';
import InvoiceService from '../services/InvoiceService';

class InvoiceController {
  static create = async (req, res) => {
    try {
      const { userId, product } = req.body;
      const user = req.decoded.decode.id;
      const result = await InvoiceService.createInvoice({ user, userId, product });
      return res.status(200).json(response.success(result));
    } catch (err) {
      const getError = response.errors(err);
      return res.status(getError.code).json(getError);
    }
  };

  static list = async (req, res) => {
    try {
      const user = req.decoded.decode.id;

      const result = await InvoiceService.listInvoice({ user });

      return res.status(200).json(response.success(result));
    } catch (err) {
      const getError = response.errors(err);
      return res.status(getError.code).json(getError);
    }
  };

  static viewInvoice = async (req, res) => {
    try {
      const { id } = req.params;

      const result = await InvoiceService.findOneInvoice({ id });

      return res.status(200).json(response.success(result));
    } catch (err) {
      const getError = response.errors(err);
      return res.status(getError.code).json(getError);
    }
  };

  static listInvoiceSeller = async (req, res) => {
    try {
      const user = req.decoded.decode.id;

      const result = await InvoiceService.listAllInvoiceSeller({ user });

      return res.status(200).json(response.success(result));
    } catch (err) {
      const getError = response.errors(err);
      return res.status(getError.code).json(getError);
    }
  };

  static delete = async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.decoded.decode.id;

      await InvoiceService.deleteInvoice({ id, user });

      return res.status(200).json(response.success(null, null, 'delete sukses'));
    } catch (err) {
      const getError = response.errors(err);
      return res.status(getError.code).json(getError);
    }
  };
}

export default InvoiceController;
