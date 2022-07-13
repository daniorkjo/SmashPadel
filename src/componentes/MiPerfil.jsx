import {
    Card,
    Form,
    Button,
    Row,
    Col
} from 'react-bootstrap'
import './BarraMenu.css'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { auth, store } from '../firebaseconfig'
import swal from 'sweetalert'

export const MiPerfil = (props) => {

    const historial = useHistory()

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [club, setClub] = useState('')
    const [genero, setGenero] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState(null)

    const [validated, setValidated] = useState(false)

    useEffect(() => {
        try {
            auth.onAuthStateChanged((user) => {
                if (user) {

                    store.collection("Usuarios").where("email", "==", user.email)
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {

                                setNombre(doc.data().nombre)
                                setEmail(doc.data().email)
                                setTelefono(doc.data().telefono)
                                setClub(doc.data().club)
                                setGenero(doc.data().genero)
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

    const ConfirmacionBorrarUsuario = (event) => {

        swal({
            title: "Eliminar",
            text: "¿Estás seguro que deseas eliminar el usuario?",
            icon: "warning",
            buttons: ["No", "Sí"]
        })
            .then(r => {
                if (r) {
                    borrarUsuario(event)
                }
            })
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

    const borrarUsuario = (event) => {

        event.preventDefault()
        try {
            const u = auth.currentUser;

            store.collection("Usuarios").where("email", "==", u.email)
                .get()
                .then((querySnapshot) => {

                    querySnapshot.forEach((doc) => {
                        store.collection("Usuarios").doc(doc.id).delete()
                            .then(() => {
                                
                            })
                            .catch(() => {
                                console.log("error al borrar el doc")
                            });
                    });
                })
                .catch((error) => {
                    console.log("Error al coger el doc para borrar: ", error);
                });


            u.delete()
                .then(() => {

                })
                .catch((error) => {
                    console.log("Error al borrar usuario de auth", error)
                });

            auth.signOut();
            swal({
                text: "Usuario Eliminado",
                icon: "success",
                timer: "2000"
            })
            historial.push("/");
        } catch (e) {
            console.log("error en el try-catch")
            console.log(e)
        }
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
                                if (password === confirmPassword && nombre.trim() && telefono.trim() && genero.trim()) {
                                    try {

                                        const usuario = {
                                            nombre: nombre,
                                            email: email,
                                            telefono: telefono,
                                            club: club,
                                            genero: genero,
                                            password: password
                                        }
                                        store.collection("Usuarios").doc(doc.id).set(usuario)
                                        user.updateEmail(email)
                                            .then(() => {
                                                console.log("cambiado el usuario")
                                                auth.signOut()
                                                swal({
                                                    text: "Usuario Actualizado",
                                                    icon: "success",
                                                    timer: "2000"
                                                })

                                                historial.push('/')
                                            })                                    
                                            .catch((e) => {
                                                if (e.code === 'auth/email-already-in-use') {
                                                    setError('El usuario ya está en uso')  
                                                }

                                                if (e.code === 'auth/invalid-email') {
                                                    setError('Formato de Email Incorrecto') 
                                                }

                                                if (e.code === 'auth/requires-recent-login') {
                                                    setError('Esta operacion requiere un inicio de sesion reciente, vuelva a registrarse') 
                                                }

                                                if (e.code === 'auth/weak-password') {
                                                    setError('La contraseña debe tener 6 caracteres o más') 
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

    return (

        <div className="AlinearCentro">
            <Card bsprefig style={{ width: '50rem', backgroundColor: 'white', padding: '10px' }}>
                <h2 className="AlinearCentroHorizontal" >Mi Perfil</h2>
                <Form noValidate validated={validated} >
                    <Form.Group as={Row} controlId="nombre">
                        <Form.Label column sm="2">Nombre: </Form.Label>
                        <Col sm="10" >
                            <Form.Control
                                type="text"
                                placeholder="Introduce nombre"
                                value={nombre}
                                onChange={(e) => { setNombre(e.target.value) }}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="email">
                        <Form.Label column sm="2">Email: </Form.Label>
                        <Col sm="10" >
                            <Form.Control
                                type="email"
                                placeholder="Introduce email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="telefono">
                        <Form.Label column sm="2">Telefono: </Form.Label>
                        <Col sm="10" >
                            <Form.Control
                                type="text"
                                placeholder="Introduce telefono"
                                value={telefono}
                                onChange={(e) => { setTelefono(e.target.value) }}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="clubs">
                        <Form.Label column sm="2">Club: </Form.Label>
                        <Col sm="10" >
                            <Form.Control
                                as="select"
                                type="text"
                                value={club}
                                placeholder="Introduce Club"
                                onChange={(e) => { setClub(e.target.value) }}
                                required
                            >
                                {/* mirar aqui como se hace onChange con una barra de opciones*/}
                                <option>--Sin especificar--</option>
                                <option>Club 1</option>
                                <option>Club 2</option>
                                <option>Club 3</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="genero">
                        <Form.Label column sm="2">Género: </Form.Label>
                        <Col sm="10" >
                            <Form.Control
                                as="select"
                                type="text"
                                value={genero}
                                placeholder="Introduce Genero"
                                onChange={(e) => { setGenero(e.target.value) }}
                                required
                            >
                                {/* mirar aqui como se hace onChange con una barra de opciones*/}
                                <option>--Sin especificar--</option>
                                <option>Masculino</option>
                                <option>Femenino</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Button onClick={LlamadaActualizar} variant="primary" tipe="button" >
                        Actualizar Datos
                    </Button>
                    <Button onClick={ConfirmacionBorrarUsuario} variant="danger" tipe="button" >
                        Borrar Usuario
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