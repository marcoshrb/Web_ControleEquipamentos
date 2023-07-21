const Sequelize = require('sequelize');
const database = require('../config/db');

const sala = require('./sala');
const equipamento = require('./equipamento');

const { DataTypes } = require('sequelize');
const moment = require('moment');


const problema = database.define('problema', {
    IDProblema: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    DateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        get() {
            return moment(this.getDataValue('DateTime')).format('DD-MM-YYYY HH:mm:ss');
        }
    },
    Descricao: {
        type: Sequelize.STRING(255),
        allowNull: true
    }
});

problema.belongsTo(sala, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'IDSala'
});

problema.belongsTo(equipamento, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'IDEquipamemto'
});

module.exports = problema;