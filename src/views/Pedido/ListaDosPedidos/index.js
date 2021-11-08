import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";


export const ListaPedido = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: '',
    });

    const getRequest = async () => {
        await axios.get(api + "/listapedidos")
            .then((response) => {
                console.log(response.data.pedidos);
                setData(response.data.pedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
                // console.log("Erro: Sem conexão com a API.")
            })
    }

    const apagaPedido = async (id) => {
        console.log(id);

        const headers = {
            'Content-type': 'application/json'
        }
        await axios.get(api + "/excluirpedido/" + id, { headers })
            .then((response) => {
                console.log(response.data.error);
                getRequest();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conectar-se à API.'
                });
            });
    }

    useEffect(() => {
        getRequest();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Lista de Pedidos</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrar-pedido" className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger">
                        {status.message}
                    </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data do pedido</th>
                            <th>ID do Cliente</th>
                            {/* <th>Ação</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ped => (
                            <tr key={ped.id}>
                                <td>{ped.id}</td>
                                <td>{ped.dataPedido}</td>
                                <td>{ped.ClienteId}</td>
                                <td className="text-center/">                                 
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => apagaPedido(ped.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};
