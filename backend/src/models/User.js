import { DataTypes, Model } from 'sequelize';
import db from '../config/db';

class User extends Model { }

User.init({
  id: {
    unique: true,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  fullname: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone_number: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  address: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  role: {
    allowNull: false,
    type: DataTypes.ENUM,
    values: ['BUYERS', 'SELLERS', 'ADMIN'],
    defaultValue: 'BUYERS',
  },
}, {
  sequelize: db,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'users',
});

export default User;
