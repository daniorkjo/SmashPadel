import React, { useState, useEffect } from 'react'
import {
    Form,
    Col,
    Button,
    Card,
    Row
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { auth, store } from '../firebaseconfig'
import swal from 'sweetalert'
import { useParams } from 'react-router-dom';

export const CardSiguienteFanatic = (props) => {
    const historial = useHistory()
    const [validated, setValidated] = useState(false);

    const [puntuacion1, setPuntuacion1] = useState();
    const [puntuacion2, setPuntuacion2] = useState();
    const [user1, setuser1] = useState();
    const [user2, setuser2] = useState();
    const [user3, setuser3] = useState();
    const [user4, setuser4] = useState();
    const [fanatic, setFanatic] = useState();
    const [usuariosApuntados, setUsuariosApuntados] = useState([])
    const [parejasUsuarios, setParejasUsuarios] = useState([])

    const { id } = useParams()

    useEffect(() => {

        auth.onAuthStateChanged((user) => {
            if (user) {
                store.collection('Fanatics').doc(id).get()
                    .then((doc) => {
                        if (doc.exists) {
                            setUsuariosApuntados(doc.data().usuariosApuntados)
                            setParejasUsuarios(doc.data().parejasUsuarios)
                            setFanatic(doc.data())

                        }
                    })
                    .catch((error) => {
                        console.log("Error obteniendo documento:", error);
                    });
            }
        });
    }, []);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };
    const RecomendacionColocarJugadores = async () => {
        usuariosApuntados.map((elemento) => {
            usuariosApuntados.map((elemento2) => {
                usuariosApuntados.map((elemento3) => {
                    usuariosApuntados.map((elemento4) => {
                        if (elemento != elemento2 && elemento3 != elemento4 && elemento != elemento3 && elemento != elemento4 && elemento2 != elemento3 && elemento2 != elemento4) {
                            
                            const parUsuario = []
                            var HanJugado = false
                            parUsuario.push(parejasUsuarios)
                            
                            parUsuario.forEach((item) =>
                                item.map((element) => {
                                    const usuarios = []
                                    usuarios.push(element.split(";"))
                                    const u1 = usuarios[0][0]
                                    const u2 = usuarios[0][1]
                                    if ((elemento == u1 && elemento2 == u2) || (elemento == u2 && elemento2 == u1) || (elemento3 == u1 && elemento4 == u2) || (elemento3 == u2 && elemento4 == u1)) {
                                        HanJugado = true
                                    }

                                })
                            );
                            if (!HanJugado) {
                                setuser1(elemento)
                                setuser2(elemento2)
                                setuser3(elemento3)
                                setuser4(elemento4)
                            }
                        }
                    })
                })

            })

        })

    }
    const Llamada = (event) => {
        handleSubmit(event);
        ConfirmarResultadoAprobacion(event);
    };

    const ConfirmarResultadoAprobacion = (event) => {

        swal({
            title: "Confirmar Resultado",
            text: "¿Estás seguro que deseas confirmar el resultado?",
            icon: "warning",
            buttons: ["No", "Sí"]
        })
            .then((r) => {
                if (r) {
                    console.log("confirmar aprobar")
                    ConfirmarResultado(r)
                }
            })

    }
    const ConfirmarResultado = async (event) => {
        if(user1!=user2 && user1!=user3 && user1!=user4 && user2!=user3 && user2!=user4 && user3!=user4){

        try {
            var nuevoArrayPuntos = fanatic.usuariosPuntos
            var nuevoArrayParejasUsuarios = fanatic.parejasUsuarios
            nuevoArrayParejasUsuarios.push(user1+";"+user2)
            nuevoArrayParejasUsuarios.push(user3+";"+user4)
            fanatic.usuariosPuntos.forEach(item => {
                const u = item.split(";")
                if (u[0] == user1) {
                    const puntosAnterior = parseInt(u[1], 10);
                    var puntuacionNueva = parseInt(puntuacion1, 10) + puntosAnterior
                    const nuevo = user1 + ";" + puntuacionNueva.toString()
                    nuevoArrayPuntos = nuevoArrayPuntos.filter((e) => e != item)
                    nuevoArrayPuntos.push(nuevo)
                    
                }

                if (u[0] == user2) {
                    const puntosAnterior = parseInt(u[1], 10);
                    var puntuacionNueva = parseInt(puntuacion1, 10) + puntosAnterior
                    const nuevo = user2 + ";" + puntuacionNueva.toString()
                    nuevoArrayPuntos = nuevoArrayPuntos.filter((e) => e != item)
                    nuevoArrayPuntos.push(nuevo)
                    
                }
                if (u[0] == user3) {
                    const puntosAnterior = parseInt(u[1], 10);
                    var puntuacionNueva = parseInt(puntuacion2, 10) + puntosAnterior
                    const nuevo = user3 + ";" + puntuacionNueva.toString()
                    nuevoArrayPuntos = nuevoArrayPuntos.filter((e) => e != item)
                    nuevoArrayPuntos.push(nuevo)
                    
                }
                if (u[0] == user4) {

                    const puntosAnterior = parseInt(u[1], 10);
                    var puntuacionNueva = parseInt(puntuacion2, 10) + puntosAnterior
                    const nuevo = user4 + ";" + puntuacionNueva.toString()
                    nuevoArrayPuntos = nuevoArrayPuntos.filter((e) => e != item)
                    nuevoArrayPuntos.push(nuevo)

                }


            })
            store.collection('Fanatics').doc(id).update({
                usuariosPuntos: nuevoArrayPuntos,
                parejasUsuarios: nuevoArrayParejasUsuarios
            })
            historial.push('/MisFanatics')
            swal({
                text: "Resultado Añadido",
                icon: "success",
                timer: "2000"
            })

        } catch (e) {
            console.log(e)
        }
    }
    }
    return (
        <div className="AlinearCentro">
            <Card bsprefig style={{ width: '60rem', backgroundColor: 'white', padding: '10px' }}>
                <h2 className="AlinearCentroHorizontal" >Siguiente Partido Fanatic</h2>
                <Form noValidate validated={validated} onSubmit={Llamada}>
                    <Form.Group as={Row} >

                        <Form.Label column sm="2">Pareja1 </Form.Label>
                        <Form.Group sm="10" controlId="usuario1"> Recomendado: {user1}
                            <Form.Control
                                as="select"
                                size='sm'
                                type="text"
                                placeholder="Introduce Usuario"
                                onChange={(e) => { setuser1(e.target.value) }}
                                required
                            >
                                <Form.Label column sm="2">Pareja1 </Form.Label>
                                {usuariosApuntados.map((user) => {
                                    return (
                                        <option key={user.id} value={user.id}>
                                            {user}
                                        </option>
                                    );
                                })}

                            </Form.Control>
                        </Form.Group>
                        <Form.Group sm="10" controlId="usuario2"> Recomendado: {user2}
                            <Form.Control
                                as="select"
                                size='sm'
                                type="text"
                                placeholder="Introduce Usuario"
                                onChange={(e) => { setuser2(e.target.value) }}
                                required
                            >
                                {usuariosApuntados.map((user) => {
                                    return (
                                        <option key={user.id} value={user.id}>
                                            {user}
                                        </option>
                                    );
                                })}
                            </Form.Control>

                        </Form.Group>
                        <Col sm="2"> Total
                            <Form.Control
                                type="number"
                                min="0"
                                size='sm'
                                placeholder="Puntuación"
                                required
                                onChange={(e) => { setPuntuacion1(e.target.value) }} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">Pareja2 </Form.Label>
                        <Form.Group sm="10" controlId="usuario3"> Recomendado: {user3}
                            <Form.Control
                                as="select"
                                size='sm'
                                type="text"
                                placeholder="Introduce Usuario"
                                onChange={(e) => { setuser3(e.target.value) }}
                                required
                            >
                                {usuariosApuntados.map((user) => {
                                    return (
                                        <option key={user.id} value={user.id}>
                                            {user}
                                        </option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group sm="10" controlId="usuario4"> Recomendado: {user4}
                            <Form.Control
                                as="select"
                                size='sm'
                                type="text"
                                placeholder="Introduce Usuario"
                                onChange={(e) => { setuser4(e.target.value) }}
                                required
                            >
                                {usuariosApuntados.map((user) => {
                                    return (
                                        <option key={user.id} value={user.id}>
                                            {user}
                                        </option>
                                    );
                                })}
                            </Form.Control>

                        </Form.Group>
                        <Col sm="2"> Total
                            <Form.Control
                                type="number"
                                min="0"
                                size='sm'
                                placeholder="Puntuación"
                                required
                                onChange={(e) => { setPuntuacion2(e.target.value) }} />
                        </Col>
                    </Form.Group>

                    <Button variant="danger" href="/MisFanatics">Cancelar</Button>
                    <Button onClick={Llamada} variant="primary" type="button">Confirmar Resultado</Button>
                    <Button onClick={(e) => RecomendacionColocarJugadores()} variant="success">Recomendar</Button>
                </Form>
            </Card>
        </div>

    );
}