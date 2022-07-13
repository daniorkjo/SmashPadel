import React, { useState, useEffect } from 'react'
import {
    Card,
    Form,
    Button,
    Row,
    Col
} from 'react-bootstrap'
import './BarraMenu.css'
import { useHistory } from 'react-router-dom'
import { auth, store } from '../firebaseconfig'
import swal from 'sweetalert'

export const CardCredencial = (props) => {

const historial = useHistory()

const [validated, setValidated] = useState(false)
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')

const [error,setError] = useState(null)

useEffect(() => {
    try {
        auth.onAuthStateChanged((user) => {
            if (user) {

                store.collection("Usuarios").where("email", "==", user.email)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {

                            setPassword(doc.data().password)
                            setConfirmPassword(doc.data().password)

                        });

                    })
                    .catch((error) => {
                        console.log("Error al coger el documento: ", error);
                    });

            }
        })

    } catch (e) {
        console.log(e);

    }

}, [])

const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    setValidated(true);
};
const LlamadaActualizar = (event) => {

    handleSubmit(event);
    ConfirmarActualizarUsuario(event);
}
const ConfirmarActualizarUsuario = (event) => {

    swal({
        title: "Actualizar",
        text: "¿Estás seguro que deseas actualizar el usuario?",
        icon: "warning",
        buttons: ["No", "Sí"]
    })
        .then((r) => {
            if (r) {
                console.log("confirmar actualizar")
                pulsarActualizar(r)
            }
        })

}
const pulsarActualizar = async (event) => {
    try {                                                                  

        auth.onAuthStateChanged((user) => {
            if (user) {
                store.collection("Usuarios").where("email", "==", user.email)
                    .get()
                    .then((querySnapshot) => {
                        console.log("principio de la promise")
                        querySnapshot.forEach((doc) => {
                            if (password === confirmPassword) {
                                try {

                                    //modificar contraseña                        
                                    user.updatePassword(password)
                                        .then(() => {
                                            
                                                console.log("contraseña cambiada")
                                                
                                                auth.signOut()
                                                swal({
                                                    text: "Usuario Actualizado",
                                                    icon: "success",
                                                    timer: "2000"
                                                })

                                                historial.push('/')
                                        })
                                        .catch((e) => {

                                            console.log(e)
                                            console.log(error)
                                            console.log(e.code)

                                            if (e.code === 'auth/requires-recent-login') {
                                                setError('Esta operacion requiere un inicio de sesion reciente, vuelva a registrarse') 
                                            }
                                            if (e.code === 'auth/weak-password') {
                                                console.log(e)
                                                console.log("entra en la comprobacion del error")
                                                setError('La contraseña debe tener 6 caracteres o más') 
                                                console.log(error)
                                            }

                                            if (e.code === 'auth/email-already-in-use') {
                                                setError('El usuario ya está en uso') 
                                            }
                                            if (e.code === 'auth/invalid-email') {
                                                setError('Formato de Email Incorrecto') 
                                            }
                                            if (e.code === 'auth/requires-recent-login') {
                                                setError('Esta operacion requiere un inicio de sesion reciente, vuelva a registrarse') 
                                            }

                                        });


                                } catch (e) {
                                    console.log("Error al sobreescribir", e)
                                }
                            } else {
                                if (password !== confirmPassword) {
                                    setError('Las contraseñas no coinciden') 
                                }
                            }

                        });

                    })
                    .catch((error) => {
                        console.log("Error al coger el documento: ", error);
                    });

            }
        })

    } catch (e) {
        console.log(e);

    }

}


    return (

        <div className="AlinearCentro">
            <Card bsprefig style={{ width: '50rem', backgroundColor: 'white', padding: '10px' }}>
                <h2 className="AlinearCentroHorizontal" >Actualizar Contraseña</h2>
                <Form noValidate validated={validated} >
                    
                    <Form.Group as={Row} controlId="contraseña">
                        <Form.Label column sm="2">Contraseña: </Form.Label>
                        <Col sm="10" >
                            <Form.Control
                                type="password"
                                placeholder="Introduce Contraseña"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="confirmarContraseña">
                        <Form.Label column sm="2">Confirmar Contraseña: </Form.Label>
                        <Col sm="10" >
                            <Form.Control
                                type="password"
                                placeholder="Introduce Contraseña"
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Button onClick={LlamadaActualizar} variant="primary" tipe="button" >
                        Actualizar Contraseña
                    </Button>
                </Form>

                {
                    error != null ?
                        (
                            <div className="MensajeError">
                                <br></br>
                                <p>{error}</p>
                            </div>
                        )
                        :
                        (
                            <span></span>
                        )
                }
            </Card>
        </div>
    )
}
