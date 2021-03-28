const Doador = require('../models/doador.model');

module.exports = {
    async index(req, res){
        const doador = await Doador.find();
        res.json(doador);
    },
    async create(req,res){
        //Requisições que chegam do frontend
        const {
                nome_doador, 
                cpf_doador, 
                email_doador, 
                dataNasc_doador, 
                tel_doador,
            } = req.body;

        let data = {
            nome_doador, 
            cpf_doador, 
            email_doador, 
            dataNasc_doador, 
            tel_doador,
        };

        let doador = await Doador.create(data);
        return res.status(200).json(doador);
    },
    async details(req, res){//Servirá de utilização interna, para consultarmo X doador/doação
        const { _id } = req.params;
        const doador = await Doador.findOne({_id});
        res.json(doador);
    },
    async delete(req, res){//Uso interno, não será possivel o Doador excluir uma doação tendo em vista que ele não tera uma pagina de controle
        const { _id } = req.params;
        const doador = await Doador.findByIdAndDelete({_id});
        return res.json(doador);
    },
}