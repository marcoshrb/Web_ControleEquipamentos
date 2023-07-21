const usuario = require('../model/usuario');

module.exports = {
    async LoginGet (req, res){
        
        session=req.session;
        if(session.edv){
            res.redirect('/');
        }
        else{
            // usuario.bulkCreate([
            //     { Nome: "Lander", Senha: "slapokk", ADM: true },
            //     { Nome: "User", Senha: "user123" },
            //   ]);

            res.render('../views/login', { message: false })
        };
    },

    async LoginPost (req, res){
        try {
            var dados = req.body;

            const login = await usuario.findByPk(dados.edv, {
                raw: true
            })

            if(!login){
                res.render('../views/login', { message: true })
                return
            }

            if(Number(dados.edv) == login.EDV && dados.senha == login.Senha){
                session = req.session;
                session.edv = dados.edv;
                session.adm = login.ADM;

                console.log(session.adm);

                res.redirect('/');
                return
            }
            else{
                res.render('../views/login', { message: true })
                return
            }
        } catch (error) {
            res.render('../views/login', { message: true })
            return        
        }
        
    },

    async Logout (req, res){
        req.session.destroy();
        res.redirect('/')
    }
}
