const sala = require('../model/sala');
const equipamento = require('../model/equipamento');
const usuario = require('../model/usuario');

module.exports = {
    async CadEquipGet(req, res) {
        if (req.session.edv){

            const salas = await sala.findAll({
                raw: true, // Retorna somente os valores de uma tabela, sem os metadados.
                attributes: ['IDSala', 'Nome']
            });
    
            const user = await usuario.findByPk(req.session.edv, {
                raw: true,
                attributes: ['Nome']
            });
    
            var ADM = req.session.adm

            res.render('../views/CadEquipamentos', { user, ADM, salas })
            return
        }
        res.redirect('/login');
    },

    async CadEquipPost(req, res)
    {
        const dados = req.body;

        await equipamento.create({
            Nome: dados.Nome,
            Quantidade: dados.Quantidade,
            IDSala: dados.Sala,
            Descricao: dados.Descricao
        })

        res.redirect('/');
    }

}