import React, { useState, useEffect } from 'react'
import {
    Button,
    Card,
    Carousel
} from 'react-bootstrap'
import { store, auth } from '../firebaseconfig'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'

export const CardMisAmistosos = (props) => {

    const [usuario, setUsuario] = useState(null)
    const [misAmistosos, setMisAmistosos] = useState([])
    const historial = useHistory()

    useEffect(() => {

        auth.onAuthStateChanged((user) => {
            if (user) {
                setUsuario(user.email)
            }
        })
        const getAmistosos = async () => {

            {/* aqui me devuelve la propiedad 'docs' de la respuesta, es un servicio de firestore */ }
            const { docs } = await store.collection('Amistosos').get()
            console.log("esto es donde compruebo el valor de docs", docs)
            {/* item es el que recorre, cada vez que iteramos, nos devuelve un objeto que contiene 2 propiedades, el id y los datos */ }
            const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
            console.log(nuevoArray)
            /* aqui ya he cogido los usuarios apuntados de cada amistosos */
            //const usuariosArray = docs.map(item => ({ id: item.id, us: item.data().usuariosApuntados }))
            //console.log(usuariosArray)
            const arrayMisAmistosos = [];
            nuevoArray.forEach(item => {
                if (item.usuariosApuntados.includes(usuario)) {
                    arrayMisAmistosos.push(item)
                }
            });
            setMisAmistosos(arrayMisAmistosos);
        }
        getAmistosos()
    }, [usuario])
    /*seguir aqui */
    const FechaNoCumplida = (item) => {
        const fecha = item.date.replace("T","-").split("-")
        const current = new Date();
        if(current.getFullYear()<fecha[0]){
            return true;
        }else if(current.getFullYear()==fecha[0] && current.getMonth()<fecha[1]){
            return true;
        }else if(current.getMonth()==fecha[1] && current.getDate()<fecha[2]){
            return true;
        }else{
            return false;
        }

    }
    const ConfirmacionDesapuntarse = (item) => {

        swal({
            title: "Desapuntarse",
            text: "¿Estás seguro que deseas desapuntarte al partido?",
            icon: "warning",
            buttons: ["No", "Sí"]
        })
            .then(r => {
                if (r) {
                    Desapuntarse(item)
                }
            })
    }

    const Desapuntarse = async (item) => {
        /* aqui comprobar que el usuario no esta ya apuntado al partido*/

        store.collection('Amistosos').doc(item.id).get()
            .then((doc) => {
                if (doc.exists) {

                    const ap = item.apuntados;
                    const usersApuntados = doc.data().usuariosApuntados.filter((item) => item !== usuario);

                    /*esto me cambia todos los campos*/
                    store.collection('Amistosos').doc(item.id).set({
                        apuntados: ap - 1,
                        date: item.date,
                        direccion: item.direccion,
                        duracion: item.duracion,
                        localidad: item.localidad,
                        nivel: item.nivel,
                        usuariosApuntados: usersApuntados,
                        participantes: item.participantes
                    })
                    historial.push("/")
                    swal({
                        text: "Desapuntado del partido",
                        icon: "success",
                        timer: "2000"
                    })
                } else {
                    console.log("no existe el documento")
                }

            }).catch((error) => {
                console.log("Error obteniendo documento:", error);
            });
    }
    return (
        <div className="FotoFondoAjustada AlinearCentro">
            <div className="CuadroPartidos"> {/*CuadroPartidos*/}
                <Carousel>
                    {
                        misAmistosos.length !== 0 ?
                            (

                                misAmistosos.map(item => (
                                    <Carousel.Item>
                                        <Card key={item.id} style={{ width: '60vmin', backgroundColor: 'grey', padding: '10px' }}>

                                            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                                            <Card.Body>
                                                <Card.Title>Amistoso</Card.Title>
                                                <Card.Text>
                                                    <li>Localidad: {item.localidad}</li>
                                                    <li>Direccion: {item.direccion}</li>
                                                    <li>Fecha y Hora: {item.date.replace("T", " ")}</li>
                                                    <li>Duracion: {item.duracion}</li>
                                                    <li>Participantes apuntados: {item.apuntados} / {item.participantes}</li>
                                                    <li>Nivel: {item.nivel} / 5</li>
                                                </Card.Text>
                                            </Card.Body>
                                            {
                                                FechaNoCumplida(item) ?
                                                    (
                                                        <Card.Footer>
                                                            <Button onClick={(e) => ConfirmacionDesapuntarse(item)} variant="primary">Desapuntarme</Button>
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
                                        <Card.Title>Sin Amistosos</Card.Title>
                                        <Card.Text>
                                            No está apuntado a ningún amistoso
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Cree un amistoso si desea jugar</small>
                                    </Card.Footer>
                                </Card>
                            )
                    }

                </Carousel>
            </div>
            </div>

    );
}