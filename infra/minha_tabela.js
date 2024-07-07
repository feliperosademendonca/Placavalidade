console.log("carregou minha_tabela.js");

const { DataTypes } = require("sequelize");
const sequelize = require("./database"); // Arquivo de configuração do Sequelize
require("dotenv").config();

const MinhaTabela = sequelize.define(
  "minha_tabela",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ean: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    info: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Adiciona campos createdAt e updatedAt automaticamente
    freezeTableName: true, // Impede a pluralização automática do nome da tabela
  }
);

module.exports = MinhaTabela;
