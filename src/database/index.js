import Sequelize from 'sequelize';

import User from '../app/models/User';
import City from '../app/models/City';
import CityComment from '../app/models/CityComment';
import TuristicPoint from '../app/models/TuristicPoint'
import Neighbor from '../app/models/Neighbor';
import Trade from '../app/models/Trade';

import databaseConfig from '../config/database';

const models = [ User, City, TuristicPoint, Neighbor, Trade, CityComment ];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
};

export default new Database();