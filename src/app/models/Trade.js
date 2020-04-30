import Sequelize, { Model } from 'sequelize';

class Trade extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        city: Sequelize.STRING,
        daypromo: Sequelize.STRING,
        neighbor: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Trade;