const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(50),
        allowNull : false
      },
      userid: {
        type: Sequelize.STRING(50),
        allowNull : false,
        unique : false
      },
      password: {
        allowNull : false,
        type: Sequelize.STRING(50)
      },
      role: {
        allowNull : false,
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING(255)
      },
      phone: {
        type: Sequelize.STRING(50)
      },
      departmentId: {
        type: Sequelize.INTEGER,
      },
      updatedPwDate: {
        type: Sequelize.DATE,
      },
    }, {
      sequelize,
      // tableName: 'tableName', // table명을 수동으로 생성 함
      // freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }
  static associate(db) {
    db.User.belongsTo(db.Department, { foreignKey: { name: 'department_id', onDelete: 'SET NULL', as: 'Department' } });
  }
};