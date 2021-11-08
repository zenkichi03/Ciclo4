import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const PedidosClientes = (props) => {
    
    const [data, setData] = useState([]);

    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: '',
    });

    const getPedidos = async () => {
        await axios.get(api + "/cliente/"+ id +"/pedidos")
            .then((response) => {
                console.log(response.data.pedidos);
                setData(response.data.pedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
                 console.log("Erro: Sem conexão com a API.")
            })
    }

    useEffect(() => {
        getPedidos();
    }, [id]);

    return (
        <div>
            <Container>
                <div className= "d-flex">
                    <div className= "m-auto p-2">
                    <h1>Pedidos do Cliente</h1>
                    </div>
                </div>
                {status.type == 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID do Pedido</th>
                            <th>Data do Pedido</th>
                            <th>ID do Cliente</th>
                            {/* <th>Ação</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(pedidos => (
                            <tr key={pedidos.id}>
                                <td>{pedidos.id}</td>
                                <th>{pedidos.dataPedido}</th>                                
                                <td>{pedidos.ClienteId}</td>
                                <td className="text-center/">
                                    <Link to={"/editar-pedidocliente/"+pedidos.id} 
                                    className= "btn btn-outline-warning btn-sm">Editar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};