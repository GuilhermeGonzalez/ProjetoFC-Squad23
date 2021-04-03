const Receptor = require('../models/receptor.model');
const bcrypt = require('bcrypt');

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
    async login(req, res) {
        let { email_rcpt, senha_rcpt } = req.body;
        const receptor = await Receptor.findOne({ email_rcpt });
        if (receptor) {
            if (bcrypt.compareSync(senha_rcpt, receptor.senha_rcpt)) {
                return res.status(200).json({ id: receptor._id });
            }
            else {
                return res.status(500).json({ msg: "Senha invalida!" });
            }
        }
        else {
            return res.status(500).json({ msg: "Email não registrado!" });
        }
    },
    async delete(req, res) {
        const { _id } = req.params;
        const receptor = await Receptor.findByIdAndDelete({ _id });
        return res.json(receptor);
    },
    async updateMeta(req, res) {
        const {
            _id,
            meta
        } = req.body;

        await Receptor.findByIdAndUpdate({ _id: _id, 'lista_materiais.status': true }, { $set: { "lista_materiais.meta": meta } });

        res.json({ msg: "Atualizado!" });
    },
    async updateMateriais(req, res) {
        const {
            _id,
            material
        } = req.body;
        console.log(material);

        let receptor = await Receptor.findOne({ _id });
        receptor.lista_materiais.material = material;
        await Receptor.findByIdAndUpdate({ _id }, receptor);
        res.json(receptor);
    },
}