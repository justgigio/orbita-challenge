module.exports = (sequelize, DataTypes) => {
  const SolarPanel = sequelize.define('solar_panels', {
    dataProvider:  DataTypes.STRING,
    installationDate:  DataTypes.DATE,
    systemSize:  DataTypes.FLOAT,
    zipCode:  DataTypes.STRING,
    state:  DataTypes.STRING,
    cost:  DataTypes.FLOAT,
  });

  return SolarPanel;
}
