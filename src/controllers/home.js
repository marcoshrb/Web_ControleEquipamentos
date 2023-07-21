const sala = require('../model/sala');
const equipamento = require('../model/equipamento');
const usuario = require('../model/usuario');

module.exports = {
    async HomeGet(req, res) {

        // await sala.bulkCreate([
        //     {Nome: 'Sala Digital'},
        //     {Nome: 'Sala ETS'},
        // ]);

        if (req.session.edv){
            const salas = await sala.findAll({
                raw: true,
                attributes: ['IDSala', 'Nome']
            });

            const user = await usuario.findByPk(req.session.edv, {
                raw: true,
                attributes: ['Nome']
            });

            var ADM = req.session.adm

            res.render('../views/index', { user, ADM, salas, equipamentos: '', id: '' });
            return
        }
        res.redirect('/login');
    },

    async homePost(req, res) {
        const id = req.body.Sala;

        const equipamentos = await equipamento.findAll({
            raw: true,
            attributes: ['IDEquipamemto', 'Nome', 'Quantidade'],
            where: { IDSala: id }
        });

        const salas = await sala.findAll({
            raw: true,
            attributes: ['IDSala', 'Nome']
        });

        const user = await usuario.findByPk(req.session.edv, {
            raw: true,
            attributes: ['Nome']
        });

        var ADM = req.session.adm

        res.render('../views/index', { user, ADM, salas, equipamentos, id });
    },

    
};
