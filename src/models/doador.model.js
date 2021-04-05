const mongoose = require('mongoose');


const DataSchema = new mongoose.Schema({
    nome_doador:String,  
    email_doador:String,
    doacao: [{
        valor_doacao: Number,
        forma_pagamento: String,
        id_receptor: String,//Qual o receptor referente a lista
    }]
}, {
    timestamp:true
})


const doador = mongoose.model('Doador', DataSchema);
module.exports = doador;