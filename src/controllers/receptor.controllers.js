const Receptor = require('../models/receptor.model');

module.exports = {
    async index(req, res) {
        const receptor = await Receptor.find();
        res.json(receptor);
    },
    async create(req, res) {
        const { nome_rcpt, cidade_rcpt, uf_rcpt, email_rcpt, senha_rcpt, cpf_rcpt, historia_rcpt, data_nasc_rcpt, tipo_rcpt, nivel_rcpt, instituicao_rcpt, dados_bancarios_rcpt, lista_materiais } = req.body;//Requisições que chegam do frontend

        let data = {};

        let receptor = await Receptor.findOne({ email_rcpt });
        if (!receptor) {
            data = { nome_rcpt, cidade_rcpt, uf_rcpt, email_rcpt, senha_rcpt, cpf_rcpt, historia_rcpt, data_nasc_rcpt, tipo_rcpt, nivel_rcpt, instituicao_rcpt, dados_bancarios_rcpt, lista_materiais };
            receptor = await Receptor.create(data);
            const secondResponse = await Receptor.findOne({ email_rcpt });
            return res.status(200).json({ msg: "Cadastrado com sucesso!", id: secondResponse._id });
        }
        else {
            return res.status(500).json({ msg: "Email já cadastrado!" });
        }
    },
    async details(req, res) {
        const { _id } = req.params;
        const receptor = await Receptor.findOne({ _id });
        res.json(receptor);
    },
    async delete(req, res) {
        const { _id } = req.params;
        const receptor = await Receptor.findByIdAndDelete({ _id });
        return res.json(receptor);
    },
    async update(req, res) {
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

        const receptor = await Receptor.findOneAndUpdate({ _id }, data, { new: true });

        res.json(receptor);
    }
}