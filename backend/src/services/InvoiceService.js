import User from '../models/User';
import ERRORS from '../config/errors';
import Invoice from '../models/Invoice';
import General from '../utils/general';

class InvoiceService {
  static createInvoice = async ({ user, userId, product }) => {
    const checkUser = await User.findByPk(userId);
    if (!checkUser) {
      throw ERRORS.USER_NOT_EXIST.replace(':id', userId);
    }
    const year = new Date().getFullYear();
    const month = (`0${new Date().getMonth() + 1}`).slice(-2);
    const noInvoice = `INV-0${month}/${year}/${General.randomNumber()}`;
    let subTotal = 0;
    product.forEach((data) => { subTotal += data.total; });

    const result = await Invoice.create({
      no_invoice: noInvoice,
      buyer_id: userId,
      seller_id: user,
      product,
      sub_total: subTotal,
    });

    return result;
  };

  static listInvoice = async ({ user }) => {
    const result = await Invoice.findAll({
      where: {
        buyer_id: user,
      },
      order: [
        ['created_at', 'DESC'],
      ],
    });

    return result;
  };

  static listAllInvoiceSeller = async ({ user }) => {
    const result = await Invoice.findAll({
      where: {
        seller_id: user,
      },
      include: {
        model: User,
        as: 'buyer',
        attributes: {
          exclude: ['password'],
        },
      },
      order: [
        ['created_at', 'DESC'],
      ],
    });

    return result;
  };

  static findOneInvoice = async ({ id }) => {
    const result = await Invoice.findByPk(id, {
      include: [
        {
          model: User,
          as: 'buyer',
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: User,
          as: 'seller',
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });

    if (!result) {
      throw ERRORS.INVOICE_NOT_EXIST.replace(':id', id);
    }

    return result;
  };

  static deleteInvoice = async ({ id, user }) => {
    const result = await Invoice.destroy({
      where: {
        id,
        seller_id: user,
      },
    });

    return result;
  };
}

export default InvoiceService;
