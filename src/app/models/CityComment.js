import Sequelize, { Model } from 'sequelize';

class CityComment extends Model {
  static init(sequelize) {
    super.init(
      {
        comment: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'author_id', as: 'author' });
    this.belongsTo(models.City, { foreignKey: 'city_id', as: 'city' });
  }
}

export default CityComment;