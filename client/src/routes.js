import React from 'react';

import { BrowserRouter, Switch, Route} from 'react-router-dom';


//imports admin
import Dashboard from './pages/admin/dashboard';

import ListasMateriais from './pages/admin/listas_de_materiais';
import ListasMateriaisEditar from './pages/admin/listas_de_materiais/listas.editar';
import ListasMateriaisCadastrar from './pages/admin/listas_de_materiais/listas.cadastrar';


import Receptor from './pages/admin/receptor';
import ReceptorEditar from './pages/admin/receptor/receptor.editar';
import ReceptorCadastrar from './pages/admin/receptor/receptor.cadastrar';

//imports client
import Home from './pages/client/home';
import ListasMateriaisDetails from './pages/client/listas_de_materiais/listas.details';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                {/*Rota Cliente*/}
                <Route path="/" exact component={Home} />
                <Route path = "/listasMateriais/:idLista" exact component={ListasMateriaisDetails} />

                {/*Rota Admin*/}
                <Route path="/admin" exact component={Dashboard} />
                <Route path="/admin/listasMateriais" exact component={ListasMateriais} />
                <Route path="/admin/listasMateriais/cadastrar" exact component={ListasMateriaisCadastrar} />
                <Route path="/admin/listasMateriais/editar/:idLista" exact component={ListasMateriaisEditar} />

                <Route path="/admin/receptor" exact component={Receptor} />
                <Route path="/admin/receptor/cadastrar" exact component={ReceptorCadastrar} />
                <Route path="/admin/receptor/editar/:idLista" exact component={ReceptorEditar} />
            </Switch>
        </BrowserRouter>
    )
}