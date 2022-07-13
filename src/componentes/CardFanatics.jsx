import React, { useState, useEffect } from 'react'
import {
    Button,
    Card,
    Carousel
} from 'react-bootstrap'
import { store, auth } from '../firebaseconfig'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'

export const CardFanatics = (props) => {

    const [fanatics, setFanatics] = useState([])
    const [usuario, setUsuario] = useState(null)
    const [fanaticsApuntado, setFanaticsApuntado] = useState([])
    const [rol, setRol] = useState(null)
    const historial = useHistory()

    var userApuntados = []
    var usuariosPuntuacion = []

    useEffect(() => {

        auth.onAuthStateChanged((user) => {
            if (user) {
                setUsuario(user.email)
                store.collection("Usuarios").where("email", "==", user.email)
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                setRol(doc.data().rol)
                                setFanaticsApuntado(doc.data().fanaticsApuntado)
                            });

                        })
                        .catch((error) => {
                            console.log("Error al coger el documento: ", error);
                        });
            }
        })
        const getFanatics = async () => {

            {/* aqui me devuelve la propiedad 'docs' de la respuesta, es un servicio de firestore */ }
            const { docs } = await store.collection('Fanatics').get()
            console.log("esto es donde compruebo el valor de docs", docs)
            {/* item es el que recorre, cada vez que iteramos, nos devuelve un objeto que contiene 2 propiedades, el id y los datos */ }
            const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
            console.log(nuevoArray)
            /* aqui ya he cogido los usuarios apuntados de cada amistosos */
            //const usuariosArray = docs.map(item => ({ id: item.id, us: item.data().usuariosApuntados }))
            //console.log(usuariosArray)

            setFanatics(nuevoArray);
        }
        getFanatics()
    }, [])
    const ConfirmacionBorrarPartido = (item) => {

        swal({
            title: "Eliminar",
            text: "¿Estás seguro que deseas eliminar el partido?",
            icon: "warning",
            buttons: ["No", "Sí"]
        })
            .then(r => {
                if (r) {
                    borrarPartido(item)
                }
            })
    }

    const borrarPartido = (item) => {

        try {

            const fanApuntados = fanaticsApuntado.filter(element => element !== item.id);

            store.collection("Fanatics").doc(item.id).delete()
            .then((querySnapshot) => {
                try {
                    auth.onAuthStateChanged((user) => {
                        if (user) {

                            store.collection("Usuarios").where("email", "==", user.email)
                            .get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    store.collection('Usuarios').doc(doc.id).update({
                                        fanaticsApuntado: fanApuntados
                                    })
                                })
                            })
                            .catch((error)=>{
                                console.log("Error al coger el doc:", error)
                            })
                        }
                    })
        
                } catch (e) {
                    console.log(e);
        
                }
            })
            .catch((error) => {
                console.log("Error al coger el doc para borrar: ", error);
            });

            swal({
                text: "Fanatic Eliminado",
                icon: "success",
                timer: "2000"
            })
            historial.push("/");
        } catch (e) {
            console.log("error en el try-catch")
            console.log(e)
        }
    }

    const ConfirmacionApuntarse = (item) => {

        swal({
            title: "Apuntarse",
            text: "¿Estás seguro que deseas apuntarte al partido?",
            icon: "warning",
            buttons: ["No", "Sí"]
        })
            .then(r => {
                if (r) {
                    Apuntarse(item)
                }
            })
    }
    const Apuntarse = async (item) => {
        /* aqui comprobar que el usuario no esta ya apuntado al partido*/
        if ((item.apuntados < item.participantes)) {
            if (!item.usuariosApuntados.includes(usuario)) {

                store.collection('Fanatics').doc(item.id).get()
                    .then((doc) => {
                        if (doc.exists) {
                            userApuntados = doc.data().usuariosApuntados;
                            usuariosPuntuacion = doc.data().usuariosPuntos;
                            const ap = item.apuntados;
                            userApuntados.push(usuario);
                            var userPuntos= usuario + ";" + "0"
                            console.log(userPuntos)
                            usuariosPuntuacion.push(userPuntos)
   
                            /*esto me cambia todos los campos, ojito cuidado, me pone a null el resto*/
                            store.collection('Fanatics').doc(item.id).set({
                                apuntados: ap + 1,
                                date: item.date,
                                direccion: item.direccion,
                                localidad: item.localidad,
                                nivel: item.nivel,
                                usuariosApuntados: userApuntados,
                                participantes: item.participantes,
                                usuariosPuntos: usuariosPuntuacion,
                                parejasUsuarios: item.parejasUsuarios

                            })
                            store.collection('Usuarios').where("email", "==", usuario)
                                .get()
                                .then((querySnapshot) => {
                                    querySnapshot.forEach((doc) => {
                                        var a = []
                                        a = doc.data().fanaticsApuntado;
                                        a.push(item.id);
                                        store.collection('Usuarios').doc(doc.id).update({
                                            fanaticsApuntado: a
                                        })
                                        historial.push("/MisPartidos")
                                    });
                                })
                                .catch((err) => {
                                    console.log(err)
                                    console.log("no me deja escribir el el array del documento de usuario")
                                })
                        } else {
                            console.log("no existe el documento")
                        }

                    }).catch((error) => {
                        console.log("Error obteniendo documento:", error);
                    });
            } else {
                alert("Ya estás apuntado al partido")
            }
        } else {
            alert("Partido completo")
        }
    }
    return (
        <div className="FotoFondoAjustada AlinearCentro">
            <div className="CuadroAmistosos">
                <Carousel>
                    {
                        fanatics.length !== 0 ?
                            (

                                fanatics.map(item => (

                                    <Carousel.Item>
                                        <Card key={item.id} style={{ width: '60vmin', backgroundColor: 'grey', padding: '10px' }}>

                                            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                                            <Card.Body>
                                                <Card.Title>Fanatic</Card.Title>
                                                <Card.Text>
                                                    <li>Localidad: {item.localidad}</li>
                                                    <li>Direccion: {item.direccion}</li>
                                                    <li>Fecha y Hora: {item.date.replace("T"," ")}</li>
                                                    <li>Participantes apuntados: {item.apuntados} / {item.participantes}</li>
                                                    <li>Nivel: {item.nivel} / 5</li>
                                                </Card.Text>
                                            </Card.Body>
                                            {
                                                usuario ?
                                                    (
                                                        <Card.Footer>
                                                            <Button onClick={(e) => ConfirmacionApuntarse(item)} variant="primary">Apuntarme</Button>
                                                            {
                                                                rol==="Administrador" ?
                                                                (
                                                                <Button onClick={(e) => ConfirmacionBorrarPartido(item)} variant="danger" tipe="button" >
                                                                    Borrar Partido
                                                                </Button>
                                                                )
                                                                :
                                                                (
                                                                    <span></span>
                                                                )
                                                            }
                                                        </Card.Footer>
                                                    )
                                                    :
                                                    (
                                                        <span></span>
                                                    )
                                            }

                                        </Card>
                                    </Carousel.Item>

                                ))

                            )
                            :
                            (
                                <Card style={{ width: '60vmin', backgroundColor: 'white', padding: '10px' }}>

                                    {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                                    <Card.Body>
                                        <Card.Title>Sin Fanatics</Card.Title>
                                        <Card.Text>
                                            No hay Fanatics iniciados para apuntarse
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Cree un fanatic si desea jugar</small>
                                    </Card.Footer>
                                </Card>
                            )
                    }

                </Carousel>
                {
                    usuario ?
                        (
                            <Button style={{ width: '60vmin' }} variant="success" href='/CrearFanatics'>Crear Fanatic</Button>
                        )
                        :
                        (
                            <span></span>
                        )
                }

            </div>

        </div>
    );
}