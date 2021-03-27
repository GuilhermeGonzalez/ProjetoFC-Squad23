const Receptor = require('../models/receptor.model');

module.exports = {
    index(req, res){
        res.json({message: 'Hello World from Controller Receptor'});
    },
    async create(req,res){
        const {nome_rcpt, cidade_rcpt, uf_rcpt, email_rcpt, senha_rcpt, cpf_rcpt, nome_inst} = req.body;//Requisições que chegam do frontend
    
        let data = {};

        let receptor = await Receptor.findOne({email_rcpt});
        if(!receptor){
            data = {nome_rcpt, cidade_rcpt, uf_rcpt, email_rcpt, senha_rcpt, cpf_rcpt, nome_inst};
            receptor = await Receptor.create(data);
            return res.status(200).json(receptor);
        }
        else {
            return res.status(500).json(receptor);
        }
    }
}