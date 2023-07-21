const Sequelize = require('sequelize');
const database = require('../config/db');

// Criando a tabela Usuario
const usuario = database.define('Usuario', {
    EDV: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    Senha: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    ADM: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
});

// Exportando essa tabela
module.exports = usuario;
