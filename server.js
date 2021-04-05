const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://user:user@projetofcsquad23.8imky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, function () {
    console.log(`Server runing on port ${port}`)
})