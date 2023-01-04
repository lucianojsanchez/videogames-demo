const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "genre",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "at least one genre name is required",
          },
        },
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
