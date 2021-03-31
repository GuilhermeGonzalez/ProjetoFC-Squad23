import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';


//imports admin
import ListasMateriais from './pages/admin/listas_de_materiais';
import Receptor from './pages/admin/receptor';

//imports client
import Home from './pages/client/home';
import ListasMateriaisDoacao from './pages/client/listas_de_materiais/listas';
import ListasMateriaisDoacaoDetails from './pages/client/listas_de_materiais/listas.details';
import Pagamento from './pages/client/pagamento';


//import Cadastro
import Cadastro from './pages/cadastro';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/*Rota Cliente*/}
                <Route path="/" exact component={Home} /> {/* Tela inicial */}
                <Route path="/listasMateriaisDoacao" exact component={ListasMateriaisDoacao} /> {/* Tela das listas disponiveis*/}
                <Route path="/listasMateriaisDoacao/:idLista" exact component={ListasMateriaisDoacaoDetails} /> {/* Tela da lista X*/}
                <Route path="/listasMateriaisDoacao/:idLista/pagamento" exact component={Pagamento} /> {/* Tela de pagamento lista X*/}


                {/* Rota de Cadastro */}
                <Route path="/cadastro" exact component={Cadastro} />{/* Tela do cadastro do receptor */}

                {/*Rota Admin = Telas em que o receptor terá controle*/}
                <Route path="/login/:idReceptor/admin/listasMateriais" exact component={ListasMateriais} /> {/* Tela das listas do receptor */}

                <Route path="/login/:idReceptor/admin/receptor" exact component={Receptor} /> {/* Tela perfil */}

            </Switch>
        </BrowserRouter>
    )
}