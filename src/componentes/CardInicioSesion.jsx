import {
    Card,
    Form,
    Button,
} from 'react-bootstrap'
import './BarraMenu.css'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react'
import {auth} from '../firebaseconfig'
import swal from 'sweetalert'

export const CardInicioSesion = (props) => {

    const historial = useHistory()
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[msgError,setMsgError] = useState(null)

    const Validar = (evento) => {
        evento.preventDefault()
    }

    const Login = (r) => {
        auth.signInWithEmailAndPassword(email,password)
        .then((r) => {
            historial.push('/')
            
            swal({    
                text: "Has iniciado sesión",
                icon: "success",
                timer: "2000"
            })
            
        })
        .catch( (err) => {
            
            if(err.code === 'auth/wrong-password'){
                setMsgError('Contraseña no válida')
            }
            if(err.code === 'auth/user-not-found'){
                setMsgError('Email no encontrado')
            }
            /* auth/wrong-password */
            /* auth/user-not-found */
        })
    }
    
    return (
        <div className="AlinearCentro">
        
        <Card style={{ width: '23rem' ,backgroundColor: 'white', padding: '10px'}}>
            {/* <Card.Header>Iniciar Sesión</Card.Header> */}
            <h2 className="AlinearCentroHorizontal">Iniciar Sesion</h2>
            <Form onSubmit={Validar}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Introduzca Correo" 
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                    {/*<Form.Text className="text-muted">
                        Introduzca su usuario
                    </Form.Text>*/}
                    
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Introduzca Contraseña" 
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                </Form.Group>
                {/* <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Recordar Usuario" />
                    </Form.Group> */}
                <Button onClick={Login} variant="primary" type="submit" >
                    Iniciar Sesión
                </Button>
                {
                    msgError !=null ?
                    (   
                        <div className="MensajeError">
                            <br></br>
                            <p>{msgError}</p>
                        </div>
                    )
                    :
                    (   
                        <p></p>
                        /* aqui lo tengo que hacer para que vuelva al Home iniciando sesion*/
                    )
                }
            </Form>
        </Card>
        
        </div>
    );
}