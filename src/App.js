import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './views/Home/';
import { Listar } from './views/Cliente/Listar/';
import { ListaServico } from './views/Servico/ListService';
import { Menu } from './components/Menu';
import { Item } from './views/Servico/Item';
import { Cadastrar } from './views/Servico/Cadastrar';
import { InserirCliente } from './views/Cliente/CadastraCliente';
import { PedidosClientes } from './views/Cliente/PedidosClientes';
import { EditarPedido } from './views/Cliente/EditarPedido';
import { ListaPedido } from './views/Pedido/ListaDosPedidos';
import { InserirPedido } from './views/Pedido/CadastrarPedido';
// import { ClientesPedidos } from './views/Pedido/ClientesDosPedidos';

function App() {
  return (
    <div>
      <Router>
        <Menu/>
        <Switch>
          <Route exact path= "/" component={Home}/>
          <Route path= "/listar-cliente" component= {Listar}/>
          <Route path= "/list-request" component= {ListaPedido}/> 
          <Route path= "/listar-servico" component= {ListaServico}/>
          <Route path= "/listar-pedido/:id" component={Item}/>
          <Route path= "/cadastrarservico" component= {Cadastrar}/>
          <Route path= "/cadastrar-cliente" component= {InserirCliente}/>
          <Route path= "/listar-pedidocliente/:id/" component= {PedidosClientes}/>
          {/* <Route path="/listar-clientepedido/:id/" component= {ClientesPedidos}/> */}
          <Route path= "/editar-pedidocliente/:id/" component= {EditarPedido}/>
          <Route path= "/cadastrar-pedido" component = {InserirPedido}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
