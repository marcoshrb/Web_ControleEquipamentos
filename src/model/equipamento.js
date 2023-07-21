const Sequelize = require('sequelize');
const database = require('../config/db');
const sala = require('./sala')

const equipamento = database.define('Equipamento', {
    IDEquipamemto: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    Quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Descricao: {
        type: Sequelize.STRING(255),
        allowNull: true
    }
});

equipamento.belongsTo(sala, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'IDSala'
});

module.exports = equipamento;
