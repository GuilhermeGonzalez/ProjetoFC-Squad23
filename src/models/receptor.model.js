const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const DataSchema = new mongoose.Schema({
    nome_rcpt: String,
    cidade_rcpt: String,
    uf_rcpt: String,
    email_rcpt: String,
    senha_rcpt: String,
    cpf_rcpt: String,
    historia_rcpt: String,
    data_nasc_rcpt: Date,
    imagem_rcpt: { data: Buffer, contentType: String },
    tipo_rcpt: String,
    nivel_rcpt: String,
    instituicao_rcpt: String,
    dados_bancarios_rcpt: {
        banco: String,
        agencia: Number,
        conta_corrente: String,
    },
    lista_materiais: {
        status: Boolean,
        meta: Number,
        valorArrecadado: Number,
        material: [{
            desc_material: String,
            qtd_material: Number,
        }]
    }
}, {
    timestamp: true
});

DataSchema.pre('save', function (next) {
    if (!this.isModified("senha_rcpt")) {
        return next();
    }
    this.senha_rcpt = bcrypt.hashSync(this.senha_rcpt, 10);
    next();
});

DataSchema.pre('findOneAndUpdate', function (next) {
    var password = this.getUpdate().senha_rcpt + '';
    if (password.length < 55) {
        this.getUpdate().senha_rcpt = bcrypt.hashSync(password, 10);
    }
    next();
})

const receptor = mongoose.model('Receptor', DataSchema);
module.exports = receptor;