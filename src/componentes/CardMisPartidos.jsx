import React, { useState, useEffect } from 'react'
import {
    Button,
    Card,
    Carousel
} from 'react-bootstrap'
import { store, auth } from '../firebaseconfig'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'

export const CardMisPartidos = (props) => {

    const [usuario, setUsuario] = useState(null)
    const [misAmistosos, setMisAmistosos] = useState([])
    const [misFanatics, setMisFanatics] = useState([])
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
            const arrayMisFanatics = [];
            nuevoArray.forEach(item => {
                if (item.usuariosApuntados.includes(usuario)) {
                    arrayMisFanatics.push(item)
                }
            });
            setMisFanatics(arrayMisFanatics);
        }
        getAmistosos()
        getFanatics()
    }, [usuario])
 
    return (
        <div> {/*FotoFondoAjustada AlinearCentro*/}
            <div className="DivMitadAnchuraIzq AlinearCentro"> {/*CuadroPartidos*/}
            <div className="CuadroPartidos">
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
                                                    <li>Fecha y Hora: {item.date}</li>
                                                    <li>Duracion: {item.duracion}</li>
                                                    <li>Participantes apuntados: {item.apuntados} / {item.participantes}</li>
                                                    <li>Nivel: {item.nivel} / 5</li>
                                                </Card.Text>
                                            </Card.Body>
                                            {/*
                                            {
                                                usuario ?
                                                    (
                                                        <Card.Footer>
                                                            <Button onClick={(e) => ConfirmacionDesapuntarseAmistosos(item)} variant="primary">Desapuntarme</Button>
                                                        </Card.Footer>
                                                    )
                                                    :
                                                    (
                                                        <span></span>
                                                    )
                                            }
                                        */}
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
                {
                    usuario ?
                        (
                            <Button style={{ width: '60vmin' }} variant="secondary" href='/MisAmistosos'>Mis Amistosos</Button>
                        )
                        :
                        (
                            <span></span>
                        )
                    }
                </div>
            </div>
            <div className="DivMitadAnchuraDer AlinearCentro">
            <div className="CuadroPartidos">
                <Carousel>
                    {
                        misFanatics.length !== 0 ?
                            (

                                misFanatics.map(item => (
                                    <Carousel.Item>
                                        <Card key={item.id} style={{ width: '60vmin', backgroundColor: 'grey', padding: '10px' }}>

                                            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                                            <Card.Body>
                                                <Card.Title>Fanatic</Card.Title>
                                                <Card.Text>
                                                    <li>Localidad: {item.localidad}</li>
                                                    <li>Direccion: {item.direccion}</li>
                                                    <li>Fecha y Hora: {item.date.replace("T", " ")}</li>
                                                    <li>Participantes apuntados: {item.apuntados} / {item.participantes}</li>
                                                    <li>Nivel: {item.nivel} / 5</li>
                                                </Card.Text>
                                            </Card.Body>
                                            {/*
                                            {
                                                usuario ?
                                                    (
                                                        <Card.Footer>
                                                            <Button onClick={(e) => ConfirmacionDesapuntarseFanatics(item)} variant="primary">Desapuntarme</Button>
                                                        </Card.Footer>
                                                    )
                                                    :
                                                    (
                                                        <span></span>
                                                    )
                                            }
                                        */}
                                        </Card>
                                    </Carousel.Item>

                                ))

                            )

                            :
                            (
                                <Card style={{ width: '60vmin', backgroundColor: 'white', padding: '10px' }}>

                                    {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                                    <Card.Body>
                                        <Card.Title>Sin Fanatic</Card.Title>
                                        <Card.Text>
                                            No está apuntado a ningún Fanatic
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
                            <Button style={{ width: '60vmin' }} variant="secondary" href='/MisFanatics'>Mis Fanatics</Button>
                        )
                        :
                        (
                            <span></span>
                        )
                    }
                </div>
            </div>
        </div>


    );
}