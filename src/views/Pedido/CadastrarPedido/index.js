import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config"

export const InserirPedido = () => {
    
    const [pedido, setPedido] = useState({
        nome: '',
        descricao:''
    });

    const[status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setPedido({
        ...pedido,[e.target.name]: e.target.value
    })

    const cadPedido = async e =>{
        e.preventDefault();
        console.log(pedido);

        const headers = {
            'Content-Type' : 'application/json'
        }

        await axios.post(api+"/pedidos", pedido, {headers})
        .then((response)=>{
            // console.log(response.data.message);
            if(response.data.error){
                setStatus({
                    type: 'error',
                    message: response.data.message
                });
            }else{
                setStatus({
                    type: 'success',
                    message: response.data.message
                });
            }
        })
       .catch(() =>{
        console.log("Erro: Sem conexão com a api.")
       });
    }    
    
    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Pedido</h1>
                </div>
                <div className="p-2">
                    <Link to="/list-request" classname="btn btn-outline-success btn-sm">Pedidos</Link>
                </div>
            </div>

            <hr className="m-1"/>

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadPedido}>
                <FormGroup className="p-2">
                    <Label>ID</Label>
                    <Input name="id"placeholder="Insira o ID do pedido" type="text" onChange={valorInput}/>
                </FormGroup>
                
                <FormGroup className="p-2">
                    <Label>Data do Pedido</Label>
                    <Input name="datapedido"placeholder="Insira a Data do Pedido" type="text" onChange={valorInput}/>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>ID do Cliente</Label>
                    <Input name="clienteid"placeholder="Insira o ID do Cliente" type="text" onChange={valorInput}/>
                </FormGroup>
                <Button type="submit" outline color = "success">Cadastrar</Button>            
                <Button type= "reset" outline color="success">Limpar</Button>
            </Form>
        </Container>
    )
}