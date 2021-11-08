import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";
import { PedidosClientes } from "../PedidosClientes";

export const EditarPedido = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [dataPedido, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const editPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/pedido/" + id,
            { id, dataPedido, ClienteId }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Alteração Feita com Sucesso'
                })
                console.log(response.data.type);
                console.log(response.data.message);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível alterar a API.'
                });
            });
    };

    useEffect(() => {
        const getPedido = async () => {
            await axios(api + "/pedido/" + id)
                .then((response) => {
                    setId(response.data.pedido.id);
                    setData(response.data.pedido.dataPedido);
                    setClienteId(response.data.pedido.ClienteId);
                })
                .catch(() => {
                    console.log("Erro: Não foi possível se conectar à API.")
                })
        }
        getPedido();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Pedido</h1>
                    </div>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente" className="m-auto btn btn-outline-primary btn-sm">Clientes</Link>
                </div>
                <hr className="m-1" />
                {status.type === 'error' ? <Alert color="danger">
                    {status.message}</Alert> : " "}
                {status.type === 'success' ? <Alert color="success">
                    {status.message}</Alert> : " "}


                <Form className="p-2" onSubmit={editPedido}>
                    <FormGroup className="p-2">
                        <Label>ID do Pedido</Label>
                        <Input name="id" placeholder="ID do Pedido" type="text" defaultValue={id}/>
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data do Pedido</Label>
                        <Input name="data" placeholder="Data do Pedido" type="text" value = {dataPedido} onChange={e => setData(e.target.value)}/>
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>ID do Cliente</Label>
                        <Input name="ClienteId" placeholder="Id do Cliente" type="text" defaultValue={ClienteId}/>
                    </FormGroup>
                    <Button type="submit" outline color="warning">Salvar</Button>
                    <Button type="reset" outline color="primary">Limpar</Button>
                </Form>
            </Container>
        </div>
    );
};