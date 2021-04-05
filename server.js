const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/projetofcsquad23', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
}, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("MongoDB CONECTADO com sucesso!");
    }
});

app.use(cors());//Basicamente ele informa quais dominios podem estar consumindo os dados da api
app.use(cookieParser());
app.use(express.json());//Quando necessitamos usar JSON para se comunicar front com back

app.use(routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.listen(port, function () {
    console.log(`Server runing on port ${port}`)
})