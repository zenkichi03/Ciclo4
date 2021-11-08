import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ClientesPedidos = (props) => {
    
    const [data, setData] = useState([]);

    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: '',
    });

    const getCustomer = async () => {
        await axios.get(api + "/pedido/"+ id +"/clientes")
            .then((response) => {
                console.log(response.data.clientes);
                setData(response.data.clientes);
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
        getCustomer();
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
                            <th>ID do Cliente</th>
                            <th>Nome do Cliente</th>
                            <th>Endereco</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Nascimento</th>
                            <th>ClienteDesde</th>
                            {/* <th>Ação</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cliente => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <th>{cliente.nome}</th>                                
                                <td>{cliente.endereco}</td>
                                <td>{cliente.cidade}</td>
                                <td>{cliente.uf}</td>
                                <td>{cliente.nascimento}</td>
                                <td>{cliente.clienteDesde}</td>
                                <td className="text-center/">
                                    {/* <Link to={"/editar-pedidocliente/"+cliente.id} 
                                    className= "btn btn-outline-warning btn-sm">Editar</Link> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};