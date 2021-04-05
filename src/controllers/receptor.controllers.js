const Receptor = require('../models/receptor.model');
const bcrypt = require('bcrypt');

module.exports = {
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

    async updateMeta(req, res) {
        const {
            _id,
            meta
        } = req.body;
        let receptor = await Receptor.findOne({ _id });
        let status = receptor.lista_materiais.status;
        if (receptor.lista_materiais.meta == 0 && receptor.lista_materiais.status == false)
            status = true;

        await Receptor.findByIdAndUpdate({ _id: _id }, { $set: { "lista_materiais.meta": meta, "lista_materiais.status": status } });

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

    async findReceptor(req, res) {
        const { uf, tipo, valor } = req.query;
        let receptor = {};

        if (uf == '' && tipo == '' && valor == 0) {
            receptor = await Receptor.find({ 'lista_materiais.status': true });
        }
        else if (uf != '' && tipo != '' && valor != 0) {
            if (valor >= 1001) {
                receptor = await Receptor.find({
                    tipo_rcpt: tipo,
                    uf_rcpt: uf,
                    'lista_materiais.meta': { $gte: valor },
                    'lista_materiais.status': true
                });
            } else {
                receptor = await Receptor.find({
                    tipo_rcpt: tipo,
                    uf_rcpt: uf,
                    'lista_materiais.meta': { $lte: valor },
                    'lista_materiais.status': true
                });
            }
        }
        else if (uf != '' && tipo != '' && valor == 0) {
            receptor = await Receptor.find({ uf_rcpt: uf, tipo_rcpt: tipo, 'lista_materiais.status': true });
        }
        else if (uf != '' && tipo == '' && valor != 0) {
            if (valor >= 1001) {
                receptor = await Receptor.find({
                    uf_rcpt: uf,
                    'lista_materiais.meta': { $gte: valor },
                    'lista_materiais.status': true
                });
            } else {
                receptor = await Receptor.find({
                    uf_rcpt: uf,
                    'lista_materiais.meta': { $lte: valor },
                    'lista_materiais.status': true
                });
            }
        }
        else if (uf == '' && tipo != '' && valor != 0) {
            if (valor >= 1001) {
                receptor = await Receptor.find({
                    tipo_rcpt: tipo,
                    'lista_materiais.meta': { $gte: valor },
                    'lista_materiais.status': true
                });
            } else {
                receptor = await Receptor.find({
                    tipo_rcpt: tipo,
                    'lista_materiais.meta': { $lte: valor },
                    'lista_materiais.status': true
                });
            }
        }
        else if (uf == '' && tipo == '' && valor != 0) {
            if (valor >= 1001) {
                receptor = await Receptor.find({
                    'lista_materiais.meta': { $gte: valor },
                    'lista_materiais.status': true
                });
            } else {
                receptor = await Receptor.find({
                    'lista_materiais.meta': { $lte: valor },
                    'lista_materiais.status': true
                });
            }
        }
        else if (uf != '' && tipo == '' && valor == 0) {
            receptor = await Receptor.find({ uf_rcpt: uf, 'lista_materiais.status': true });
        }
        else if (uf == '' && tipo != '' && valor == 0) {
            receptor = await Receptor.find({ tipo_rcpt: tipo, 'lista_materiais.status': true });
        }
        res.json(receptor);
    },

    async valorArrecado(req, res) {

        const { _id, valorarrecadado } = req.params;

        const receptor = await Receptor.findByIdAndUpdate({ _id: _id, 'lista_materiais.status': true }, { $inc: { 'lista_materiais.valorArrecadado': valorarrecadado } })

        return res.json(receptor)
    },

    async updateHistoria(req, res) {
        const {
            _id,
            historia_rcpt
        } = req.body;

        await Receptor.findByIdAndUpdate({ _id: _id }, { $set: { "historia_rcpt": historia_rcpt } });

        res.json({ msg: "Atualizado!" });
    },
    async updateDadosBancarios(req, res) {
        const {
            _id,
            dados_bancarios_rcpt
        } = req.body;

        await Receptor.findByIdAndUpdate({ _id: _id }, { $set: { "dados_bancarios_rcpt": dados_bancarios_rcpt } });

        res.json({ msg: "Atualizado!" });
    },
}