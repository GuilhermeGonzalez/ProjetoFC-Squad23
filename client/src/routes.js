import React from 'react';

import { BrowserRouter, Switch, Route} from 'react-router-dom';


//imports admin
import Dashboard from './pages/admin/dashboard';

import ListasMateriais from './pages/admin/listas_de_materiais';
import ListasMateriaisEditar from './pages/admin/listas_de_materiais/listas.editar';
import ListasMateriaisCadastrar from './pages/admin/listas_de_materiais/listas.cadastrar';

import Receptor from './pages/admin/receptor';
import ReceptorEditar from './pages/admin/receptor/receptor.editar';

//imports client
import Home from './pages/client/home';
import ListasMateriaisDoacao from './pages/client/listas_de_materiais/listas';
import ListasMateriaisDoacaoDetails from './pages/client/listas_de_materiais/listas.details';
import Pagamento from './pages/client/pagamento';

//import login
import Login from './pages/login';

//import Cadastro
import Cadastro from './pages/cadastro';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                {/*Rota Cliente*/}
                <Route path="/" exact component={Home} /> {/* Tela inicial */}
                <Route path = "/listasMateriaisDoacao" exact component={ListasMateriaisDoacao} /> {/* Tela das listas disponiveis*/}
                <Route path = "/listasMateriaisDoacao/:idLista" exact component={ListasMateriaisDoacaoDetails} /> {/* Tela da lista X*/}
                <Route path = "/listasMateriaisDoacao/:idLista/pagamento" exact component={Pagamento} /> {/* Tela de pagamento lista X*/}
                
                {/* Rota de Login */}
                <Route path="/login" exact component={Login} />

                {/* Rota de Cadastro */}
                <Route path="/cadastro" exact component={Cadastro} />{/* Tela do cadastro do receptor */}
                
                {/*Rota Admin = Telas em que o receptor terá controle*/}
                <Route path="/login/:idReceptor/admin" exact component={Dashboard} /> {/* Tela informações gerais pós login */}
                <Route path="/login/:idReceptor/admin/listasMateriais" exact component={ListasMateriais} /> {/* Tela das listas do receptor */}
                <Route path="/login/:idReceptor/admin/listasMateriais/cadastrar" exact component={ListasMateriaisCadastrar} /> {/* Tela do cadastro da lista */}
                <Route path="/login/:idReceptor/admin/listasMateriais/editar/:idLista" exact component={ListasMateriaisEditar} /> {/* Tela de edição da lista */}

                <Route path="/login/:idReceptor/admin/receptor" exact component={Receptor} /> {/* Tela perfil */}
                <Route path="/login/:idReceptor/admin/receptor/editar/:idReceptor" exact component={ReceptorEditar} /> {/* Tela de edição do receptor */}

            </Switch>
        </BrowserRouter>
    )
}