import Sequelize, { Model } from 'sequelize';

class TuristicPoint extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        city: Sequelize.STRING,
        score: Sequelize.INTEGER,
        description: Sequelize.STRING,
        comment: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default TuristicPoint;