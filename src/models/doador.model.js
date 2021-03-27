const mongoose = require('mongoose');


const DataSchema = new mongoose.Schema({
    nome_doador:String, 
    cpf_doador:String, 
    email_doador:String,
    dataNasc_doador: Date,
    tel_doador: String,
    doacao: Array[{
        valor_doacao: Number,
        mensagem_doacao: String,
        forma_pagamento:[{
            formato_escolhido:String,
            desc_geral: String, //Independente do formato escolhido será salvo as informações solicitadas para X forma
        }],
        id_receptor: Number,//Qual o receptor referente a lista
        id_listaM_doado: Number,//Qual a lista escolhida
    }]
}, {
    timestamp:true
})


const doador = mongoose.model('Doador', DataSchema);
module.exports = doador;