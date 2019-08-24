'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
   return queryInterface.createTable('solar_panels', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    dataProvider: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    installationDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    systemSize: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    zipCode: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    cost: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  },

  down: (queryInterface) => {
    return queryInterface.dropTable('solar_panels');
  }
};
