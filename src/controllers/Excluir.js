const equipamento = require('../model/equipamento');
const sala = require('../model/sala');
const usuario = require('../model/usuario');
const notifier = require('node-notifier');

module.exports = {
    
    async EditRender (req, res){
        if (req.session.edv){

            const id = req.params.id;
    
            const equipamentos = await equipamento.findByPk(id, {
                raw: true,
                attributes: ['IDEquipamemto', 'Nome', 'Quantidade', 'IDSala'],
            });
    
            const salas = await sala.findByPk(equipamentos.IDSala, {
                raw: true,
                attributes: ['IDSala', 'Nome']
            });
    
            const user = await usuario.findByPk(req.session.edv, {
                raw: true,
                attributes: ['Nome']
            });
        
            var ADM = req.session.adm

            res.render('../views/ExcluirEquip', { user, ADM, equipamentos, salas })
            return
        }

        res.redirect('/login');
    },

    async UpdateTable(req, res) {
        
        const dados = req.body;
        const idEquip = req.params.id;
        var aux = 0;
        var alert = false;

        const qntd = await equipamento.findByPk(idEquip, {
            raw: true,
            attributes: ['Quantidade']
        });

        aux = qntd.Quantidade - dados.Quantidade;

        if (aux < 0)
        {
            res.redirect('/');
        }
        else{
            await equipamento.update({
                Quantidade: aux,
            },{
                where: { IDEquipamemto: idEquip}
            });
    
            // const salas = await sala.findAll({
            //     raw: true,
            //     attributes: ['IDSala', 'Nome']
            // });
    
            res.redirect('/');

        }
    }
}
