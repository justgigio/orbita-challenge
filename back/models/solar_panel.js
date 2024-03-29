module.exports = (sequelize, DataTypes) => {
  const SolarPanel = sequelize.define('SolarPanel', {
    dataProvider:  DataTypes.STRING,
    installationDate:  DataTypes.DATE,
    systemSize:  DataTypes.FLOAT,
    zipCode:  DataTypes.STRING,
    state:  DataTypes.STRING,
    cost:  DataTypes.FLOAT,
  },
  {
    tableName: 'solar_panels'
  });

  return SolarPanel;
}
