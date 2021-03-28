const Receptor = require('../models/receptor.model');

module.exports = {
    async index(req, res){
        const receptor = await Receptor.find();
        res.json(receptor);
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
    },
    async details(req, res){
        const { _id } = req.params;
        const receptor = await Receptor.findOne({_id});
        res.json(receptor);
    },
    async delete(req, res){
        const { _id } = req.params;
        const receptor = await Receptor.findByIdAndDelete({_id});
        return res.json(receptor);
    },
    async update(req, res){
        const {
            _id, 
            nome_rcpt, 
            cidade_rcpt,
            uf_rcpt,
            email_rcpt,
            senha_rcpt,
            cpf_rcpt,
            nome_inst 
        } = req.body;

        const data = { 
            nome_rcpt, 
            cidade_rcpt,
            uf_rcpt,
            email_rcpt,
            senha_rcpt,
            cpf_rcpt,
            nome_inst 
        }

        const receptor = await Receptor.findOneAndUpdate({_id},data, {new: true});

        res.json(receptor);
    }
}