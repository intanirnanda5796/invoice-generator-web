import { DataTypes, Model } from 'sequelize';
import db from '../config/db';
import User from './User';

class Invoice extends Model {}

Invoice.init({
  id: {
    unique: true,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  no_invoice: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  buyer_id: {
    type: DataTypes.UUID,
    allowNull: false,
    onDelete: 'CASCADE',
    references: {
      model: 'users',
      key: 'id',
    },
  },
  seller_id: {
    type: DataTypes.UUID,
    allowNull: false,
    onDelete: 'CASCADE',
    references: {
      model: 'users',
      key: 'id',
    },
  },
  product: {
    allowNull: false,
    type: DataTypes.JSONB,
  },
  sub_total: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
}, {
  sequelize: db,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: false,
  tableName: 'invoices',
});

Invoice.belongsTo(User, { as: 'buyer', foreignKey: 'buyer_id' });
Invoice.belongsTo(User, { as: 'seller', foreignKey: 'seller_id' });

export default Invoice;
