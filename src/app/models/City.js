import Sequelize, { Model } from 'sequelize';

class City extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        state: Sequelize.STRING,
        score: Sequelize.INTEGER,
        description: Sequelize.STRING,
        salary: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associations(models) {
    this.belongsTo(models.File, { foreignKey: 'file_id', as: 'file' });
  }
}

export default City;