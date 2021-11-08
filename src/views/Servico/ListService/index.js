import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListaServico = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: '',
    });

    const getServicos = async () => {
        await axios.get(api + "/listaservicos")
            .then((response) => {
                console.log(response.data.servicos);
                setData(response.data.servicos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
                // console.log("Erro: Sem conexão com a API.")
            })
    }

    const apagarServico = async(id)=>{
        console.log(id);

        const headers={
            'Content-type' : 'application/json'
        }
        await axios.get(api+"/excluirservico/"+id, {headers})
        .then((response) =>{
            console.log(response.data.error);
            getServicos();
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Não foi possível conectar-se à API.'
            });
        });
    }

    useEffect(() => {
        getServicos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Lista de Serviços</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarservico" className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                    {status.type == 'error' ? <Alert color="danger">
                        {status.message}
                    </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            {/* <th>Ação</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-pedido/" + item.id}
                                        className="btn btn-outline-primary btn-sm">Consultar</Link>
                                        <span className= "btn btn-outline-danger btn-sm" onClick={()=> apagarServico(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};