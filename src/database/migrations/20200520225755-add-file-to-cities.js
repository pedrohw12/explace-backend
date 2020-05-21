'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'cities', // qual tabela que eu quero adicionar uma coluna
      'file_id', // qual o nome da coluna que vai ser adicionada
      {
        type: Sequelize.INTEGER, // integer porque vamos referenciar apenas o ID da imagem
        references: { model: 'files', key: 'id' },  // a foreing key
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('cities', 'file_id');
  }
};

// {
//   type: Sequelize.INTEGER, // integer porque vamos referenciar apenas o ID da imagem

//   references: { model: 'files', key: 'id' },  // a foreing key
//   # model - qual o nome da tabela dentro de model 
//   |_ por exemplo, eu quero que este campo referencie a tabela files
//   # key - é a chave que vou referenciar, por exemplo, o ID da tabela files

//   onUpdate: 'CASCADE',
//   onDelete: 'SET NULL',
//   allowNull: true,
// },