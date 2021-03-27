const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const DataSchema = new mongoose.Schema({
    nome_rcpt:String, 
    cidade_rcpt:String,
    uf_rcpt:String,
    email_rcpt:String,
    senha_rcpt:String,
    cpf_rcpt:String, 
    nome_inst:String,
    lista_materiais: [{
        status_listaM: Boolean,
        valorTotal_listaM: Number,
        valorAtual_listaM: Number,
        descricao_listaM: String,
        imagem_listaM: {data: Buffer, contentType: String},
        dataCriacao_listaM: Date,
        dataAtualizacao_listaM: Date,
        material: [{
            desc_material: String,
            qtd_material: Number,
            valor_unitario: Number, 
        }]
    }]
}, {
    timestamp:true
});

DataSchema.pre('save', function(next){
    if(!this.isModified("senha_rcpt")){
        return next();
    }
    this.senha_rcpt = bcrypt.hashSync(this.senha_rcpt, 10);
    next();
});

const receptor = mongoose.model('Receptor', DataSchema);
module.exports = receptor;