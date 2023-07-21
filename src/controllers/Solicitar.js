const equipamento = require('../model/equipamento');
const sala = require('../model/sala');
const ordem = require('../model/ordens');
const usuario = require('../model/usuario');


module.exports = {
    
    async SolicitarGet (req, res){
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

            res.render('../views/SolicitarEquip', { user, ADM, equipamentos, salas })
            return
        }
        
        res.redirect('/login');
    },

    async PassaOrdem(req, res)
    {   
        dados = req.body;

        await ordem.create({
            Quantidade: dados.Quantidade,
            IDSala: dados.Sala,
            IDEquipamemto: dados.IDEquipamemto,
            Descricao: null
        })

        res.redirect('/');
    }
}
