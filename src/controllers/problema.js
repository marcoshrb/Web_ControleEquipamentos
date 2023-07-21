const sala = require('../model/sala');
const equipamento = require('../model/equipamento');
const problema = require('../model/problema');
const { where } = require('sequelize');
const usuario = require('../model/usuario');

module.exports = {

    async RelatarGet(req, res) {
        if (req.session.edv){
            const salas = await sala.findAll({
                raw: true,
                attributes: ['IDSala', 'Nome']
            })
    
            const user = await usuario.findByPk(req.session.edv, {
                raw: true,
                attributes: ['Nome']
            });
            
            var ADM = req.session.adm
    
            res.render('../views/relatar', { user, ADM, idSala: '', salas, equipamentos: '' , id: '' });
            return
        }
        

        res.redirect('/login');
    },

    async RelatarPost(req, res) {

        const id = req.body.Sala;
        
        const equipamentos = await equipamento.findAll({
            raw: true,
            attributes: ['IDEquipamemto', 'Nome', 'IDSala'],
            where: { IDSala: id }
        });

        const salas = await sala.findAll({ 
            raw: true, 
            attributes: ['IDSala', 'Nome']});

            const user = await usuario.findByPk(req.session.edv, {
                raw: true,
                attributes: ['Nome']
            });

        var ADM = req.session.adm

        res.render('../views/relatar', { user, ADM, idSala: id, salas, equipamentos, id});
    },

    async EnviarPost(req, res){
        dados = req.body;

        await problema.create({
            IDSala: dados.idSala,
            IDEquipamemto: dados.Equipamemto,
            Descricao: dados.Descricao
        })

        res.redirect('/Ordens');
    }

}
