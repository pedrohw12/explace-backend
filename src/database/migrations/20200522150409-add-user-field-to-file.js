'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'files', // qual tabela que eu quero adicionar uma coluna
      'city_id', // qual o nome da coluna que vai ser adicionada // Quero add a coluna city_id na tabela files
      {
        type: Sequelize.INTEGER, // integer porque vamos referenciar apenas o ID da imagem
        references: { model: 'cities', key: 'id' },  // a foreing key
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('files', 'city_id');
  }
};

// {
//   type: Sequelize.INTEGER, // integer porque vamos referenciar apenas o ID da imagem

//   references: { model: 'cities', key: 'id' },  // a foreing key
//   # model - qual o nome da tabela dentro de model 
//   |_ por exemplo, eu quero que este campo referencie a tabela cities
//   # key - é a chave que vou referenciar, por exemplo, o ID da tabela cities