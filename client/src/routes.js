import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';


//imports admin
import ListaMateriais from './pages/admin/listaMateriais';
import Receptor from './pages/admin/receptor';

//imports client
import Home from './pages/client/home';
import Doacao from './pages/client/doacao';
import Pagamento from './pages/client/pagamento';



//import Cadastro
import Cadastro from './pages/cadastro';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/*Rota Cliente*/}
                <Route path="/" exact component={Home} /> {/* Tela inicial */}
                <Route path="/Doacao/:idReceptor" exact component={Doacao} /> {/* Tela das listas disponiveis*/}
                <Route path="/Doacao/:idReceptor/pagamento" exact component={Pagamento} /> {/* Tela de pagamento lista X*/}


                {/* Rota de Cadastro */}
                <Route path="/cadastro" exact component={Cadastro} />{/* Tela do cadastro do receptor */}

                {/*Rota Admin = Telas em que o receptor terá controle*/}
                <Route path="/login/:idReceptor/admin/listaMateriais" exact component={ListaMateriais} /> {/* Tela das listas do receptor */}

                <Route path="/login/:idReceptor/admin/receptor" exact component={Receptor} /> {/* Tela perfil */}

            </Switch>
        </BrowserRouter>
    )
}