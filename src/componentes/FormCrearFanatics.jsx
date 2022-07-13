import React, { useState } from 'react'
import {
    Form,
    Col,
    Button,
    Card,
    Row
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { store } from '../firebaseconfig'
import swal from 'sweetalert'

export const FormCrearFanatics = (props) => {
    const [validated, setValidated] = useState(false);
    const historial = useHistory()

    const [localidad,setLocalidad] = useState(null)
    const [direccion,setDireccion] = useState(null)
    const [date,setDate] = useState(null)
    const [participantes,setParticipantes] = useState(null)
    const [nivel,setNivel] = useState(null)

    class UsuariosPuntos{
        constructor(email, puntuacion){
            
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const Llamada = (event) => {
        handleSubmit(event);
        Registrar(event);
    };
    const Registrar = (event) => {
        event.preventDefault()
        const fanatic = {
            localidad: localidad,
            direccion: direccion,
            date: date,
            participantes: participantes,
            nivel: nivel,
            apuntados : 0,
            usuariosApuntados : [],
            parejasUsuarios : [],
            usuariosPuntos : []
            
        }
        try {
            if(localidad!=null && direccion!=null && date!=null && participantes!=null && nivel!=null){
                store.collection('Fanatics').add(fanatic)
                historial.push('/')
                swal({
                    text: "Fanatic Creado",
                    icon: "success",
                    timer: "2000"
                })     
            }
        }catch (e){
            console.log(e)
        }
    }
    return (
        <div className="AlinearCentro">
            <Card bsprefig style={{ width: '50rem', backgroundColor: 'white', padding: '10px' }}>
            <h2 className="AlinearCentroHorizontal" >Crear Fanatic</h2>
                <Form noValidate validated={validated} onSubmit={Llamada}>

                    <Form.Group as={Row} >
                        <Form.Label column sm="2">Localidad:</Form.Label>
                        <Col sm="10" >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Introducir Localidad"
                            onChange={(e) => { setLocalidad(e.target.value) }}
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">Centro Deportivo:</Form.Label>
                        <Col sm="10" >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Introducir Centro Deportivo o dirección"
                            onChange={(e) => { setDireccion(e.target.value) }}
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">Fecha y hora:</Form.Label>
                        <Col sm="10" >
                        <Form.Control
                            required
                            type="datetime-local"
                            placeholder="Aqui hacerlo con Calendario en vez de texto"
                            onChange={(e) => { setDate(e.target.value) }}
                        />
                        </Col>
                    </Form.Group>  
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">Participantes:</Form.Label>
                        <Col sm="10" >
                        <Form.Control 
                            type="number" 
                            min="0" 
                            placeholder="Número de participantes" 
                            required 
                            onChange={(e) => { setParticipantes(e.target.value) }}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">Nivel:</Form.Label>
                        <Col sm="10" >
                        <Form.Control 
                            type="number" 
                            min="0" 
                            max="5" 
                            step="0.1" 
                            placeholder="Nivel de 0 a 5" 
                            required 
                            onChange={(e) => { setNivel(e.target.value) }} />
                        </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit">Crear Fanatic</Button>
                </Form>
            </Card>
        </div>
    );
}