const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      heightMin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      heightMax: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weightMin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weightMax: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      life_span: {
        type: DataTypes.STRING,
        defaultValue: "10 - 12",
      },
      breed_group: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bred_for: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
        // defaultValue: "https://i.ibb.co/QQkvngW/wolf.png",
        //defaultValue: "https://i.ibb.co/x6HF241/Linda1.jpg"
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdDb: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
