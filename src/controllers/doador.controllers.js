const Doador = require('../models/doador.model');
const Receptor = require('../models/receptor.model');

module.exports = {
    async index(req, res) {
        const doador = await Doador.find();
        res.json(doador);
    },

    async create(req, res) {
        const { nome_doador, email_doador, doacao } = req.body;
        let data = {};
        let doador = await Doador.findOne({ email_doador });
        let msg = 'Erro na doação';

        if (!doador) {
            data = { nome_doador, email_doador, doacao };
            doador = await Doador.create(data);
            await Receptor.findByIdAndUpdate({ _id: doacao.id_receptor }, { $inc: { 'lista_materiais.valorArrecadado': doacao.valor_doacao } });
            msg = "Muito obrigado, doação feita com sucesso !";
        } else {
            doador = await Doador.findOneAndUpdate({ email_doador }, { $push: { doacao: doacao } });
            await Receptor.findByIdAndUpdate({ _id: doacao.id_receptor }, { $inc: { 'lista_materiais.valorArrecadado': doacao.valor_doacao } });
            msg = "Muito obrigado, doação feita com sucesso !";
        }

        let _id = doacao.id_receptor;
        const receptor = await Receptor.findOne({ _id });
        if (receptor.lista_materiais.valorArrecadado >= receptor.lista_materiais.meta) {
            await Receptor.findByIdAndUpdate({ _id: doacao.id_receptor }, { $set: { 'lista_materiais.status': false } })
        }

        return res.json({ mensagem: msg });
    },

    async details(req, res) {//Servirá de utilização interna, para consultarmo X doador/doação
        const { _id } = req.params;
        const doador = await Doador.findOne({ _id });
        res.json(doador);
    },
    async delete(req, res) {//Uso interno, não será possivel o Doador excluir uma doação tendo em vista que ele não tera uma pagina de controle
        const { _id } = req.params;
        const doador = await Doador.findByIdAndDelete({ _id });
        return res.json(doador);
    },
}