const sala = require('../model/sala');
const equipamento = require('../model/equipamento');
const ordem = require('../model/ordens');
const problema = require('../model/problema');
const usuario = require('../model/usuario');
const moment = require('moment');

module.exports = {
    async OrdensGet(req, res){
        if (req.session.edv){

            const ordens = await ordem.findAll({
                raw: true,
                attributes:['IDOrdem', 'DateTime', 'Quantidade', 'IDSala', 'IDEquipamemto'],
                include: [{
                    model: equipamento,
                    required: false,
                    attributes: ['Nome', 'Quantidade', 'Descricao'],
                    include: [{
                        model: sala,
                        required: false,
                        attributes: ['Nome'],
                    }]
                }]
            });

       
            const problemas = await problema.findAll({
                raw: true,
                attributes:['IDProblema', 'DateTime', 'Descricao', 'IDSala', 'IDEquipamemto'],
                include: [{
                    model: equipamento,
                    required: false,
                    attributes: ['Nome', 'Quantidade', 'Descricao'],
                    include: [{
                        model: sala,
                        required: false,
                        attributes: ['Nome'],
                    }]
                }]
            });

            function formatedDate(date){
                // Converter a string em um objeto Date
                const datetime = new Date(date);
                
                // Extrair os componentes da data
                const day = datetime.getDate();
                const month = datetime.getMonth() + 1; // Os meses em JavaScript são indexados a partir de 0
                const year = datetime.getFullYear();
                
                // Extrair os componentes do horário
                const hours = datetime.getHours();
                const minutes = datetime.getMinutes();
                
                // Formatar a data e hora no formato desejado
                return formattedDatetimeordens = `${day}/${month}/${year} ${hours}:${minutes}`;
            }

                

            const user = await usuario.findByPk(req.session.edv, {
                raw: true,
                attributes: ['Nome']
            });

            var ADM = req.session.adm

            res.render('../views/historico', { user, ADM, ordens, problemas, formatedDate})
            return
        }
        
        res.redirect('/login');
    },

    async OrdensPostConfirma(req, res){

        const dados = req.body;
        const idEquip = dados.IDEquipamemto;
        const inputValue = dados.submit;
        var aux = 0;

        if (inputValue == 'confirma'){
            
            const qntd = await equipamento.findByPk(idEquip, {
                raw: true,
                attributes: ['Quantidade']
            });
    
            aux = parseInt(qntd.Quantidade) + parseInt(dados.Quantidade);
    
            await equipamento.update({
                Quantidade: aux,
            },{
                where: { IDEquipamemto: idEquip}
            });

        }

        await ordem.destroy({
            where: { IDOrdem: dados.IDOrdem },
        })

        res.redirect('/Ordens')
    },
    
    async ProblemaPostConfirma(req, res){

        const dados = req.body;

        await problema.destroy({
            where: { IDProblema: dados.IDProblema },
        })

        res.redirect('/Ordens')

    }

}