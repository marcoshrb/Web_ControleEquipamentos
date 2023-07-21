// Iniciando Route do Express
const express = require('express');
const route = express.Router();

// Importando os Controllers
const cadastro = require('./src/controllers/Cadastro')
const home = require('./src/controllers/home');
const login = require('./src/controllers/login');
const problema = require('./src/controllers/problema');
const equipamento = require('./src/controllers/Cadequipamento');
const excluir = require('./src/controllers/Excluir');
const ordem = require('./src/controllers/Ordens');
const solicitar = require('./src/controllers/Solicitar');


// Iniciando as rotas
route
    .get('/', home.HomeGet).post('/', home.homePost)

    .get('/excluir/:id', excluir.EditRender).post('/excluir/:id', excluir.UpdateTable)
    .get('/solicitar/:id', solicitar.SolicitarGet).post('/solicitar/:id', solicitar.PassaOrdem)

    .get('/Cadatro_Equipamentos', equipamento.CadEquipGet).post('/Cadatro_Equipamentos', equipamento.CadEquipPost)

    .get('/relatar', problema.RelatarGet).post('/relatar', problema.RelatarPost)
    .post('/relatar/Enviar/', problema.EnviarPost)

    .get('/Ordens', ordem.OrdensGet).post('/Ordens', ordem.OrdensPostConfirma)
    .post('/Ordens/Problema', ordem.ProblemaPostConfirma)
    
    .get('/login', login.LoginGet).post('/login', login.LoginPost)
    .get('/logout', login.Logout)

    .get('/cadastro', cadastro.CadastroGet).post('/cadastro', cadastro.CadastroPost)
    
module.exports = route;
