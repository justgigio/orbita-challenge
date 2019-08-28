module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    state: DataTypes.STRING,
  }, {
    tableName: 'users'
  });

  return User;
}
