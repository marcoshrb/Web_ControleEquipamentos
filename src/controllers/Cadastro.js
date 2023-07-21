const usuario = require('../model/usuario');

module.exports = {
    async CadastroGet(req, res) {

        res.render('Cadastro');

    },

    async CadastroPost(req, res) {
        
        const dados = req.body;
        
        await usuario.create({
            EDV: dados.edv,
            Nome: dados.Nome,
            Senha: dados.Senha,
            ADM: 0
        });
        res.redirect('/login');
      
    }
};