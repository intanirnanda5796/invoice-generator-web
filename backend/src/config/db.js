import Sequelize from 'sequelize';
import config from './config';

const db = new Sequelize(config.database, config.username, config.password, config);

export default db;
