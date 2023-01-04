const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(71),
        allowNull: false,
        validate: {
          notNull: {
            msg: "a name is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      released: {
        type: DataTypes.STRING(10),
        allowNull: true,
        validate: {
          isDate: {
            msg: "A date is required",
          },
        },
      },
      rating: {
        type: DataTypes.DECIMAL(10, 1),
        allowNull: true,
        validate: {
          min: 0,
          max: 5,
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: {
            msg: "a url is required",
          },
        },
      },
      createdInDB: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
