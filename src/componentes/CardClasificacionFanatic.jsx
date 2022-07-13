import React, { useState, useEffect } from 'react'
import {
    Form,
    Col,
    Button,
    Card,
    Row,
    ListGroup,
} from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import { auth,store } from '../firebaseconfig'
import swal from 'sweetalert'
import { Scrollbars } from "react-custom-scrollbars"

export const CardClasificacionFanatic = (props) => {
    const [usuariosPuntos, setUsuariosPuntos] = useState([])
    const [resultado, setResultado] = useState([])
    const { id } = useParams()

    useEffect(() => {

        auth.onAuthStateChanged((user) => {
            if (user) {
                store.collection('Fanatics').doc(id).get()
                    .then((doc) => {
                        if (doc.exists) {
                            setUsuariosPuntos(doc.data().usuariosPuntos)
                        }
                    })
                    .catch((error) => {
                        console.log("Error obteniendo documento:", error);
                    });
            }
        });
    }, []);

    const OrdenarClasificacion = async () => {
        var clasificacion = [{}]
        usuariosPuntos.forEach((item) =>{
            const usuarios = []
            usuarios.push(item.split(";"))
            const u1 = usuarios[0][0]
            const u2 = parseInt(usuarios[0][1],10)
            clasificacion.push({u1,u2})
            console.log(clasificacion)
            console.log(u1)
            console.log(u2)
        });
        
        clasificacion.sort(function (a, b){
            if (a.u2 < b.u2) {
                return 1;
              }
              if (a.u2 > b.u2) {
                return -1;
              }
              // a must be equal to b
              return 0;
        })
        let longitud = 1
        const res = []
        console.log(longitud)
        clasificacion.forEach((item) =>{
            console.log(item)
            if(item.u2>-1){
                console.log("EEEEE "+item)
                res.push(longitud + " - "+ item.u1 + " - "+item.u2)
                longitud = longitud +1
            }
            
        })
        setResultado(res)
    }

    return (
        <div className="FotoFondoAjustada AlinearCentro">
            
            <div className="CuadroAmistosos">
            <Scrollbars style={{ width: "100%", height: "100%" }}>
                <Card style={{ width: '60vmin', backgroundColor: 'White', padding: '10px' }}>

                    {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                    <Card.Body>
                        <h2 className="AlinearCentroHorizontal" >Clasificación Fanatic</h2>
                        <ListGroup as="ol" numbered>
                        <h5>Posición - Participante - Puntuación</h5>
                        {resultado.map((user) => {
                                    
                                    return (
                                        <ListGroup.Item as="li" key={user.id} value={user.id}>
                                            {user}
                                        </ListGroup.Item>
                                    );
                                })}

                        </ListGroup>

                    </Card.Body>
                    <Row sm={3} >
                        <Col sm="1"></Col>
                        <Button variant="danger" style={{ width: "15%" }} href="/MisFanatics">Cancelar</Button>
                        <Button variant="success" onClick={OrdenarClasificacion} style={{ width: "20%" }}>Obtener Clasificación</Button>
                    </Row>

                </Card>
                </Scrollbars>
            </div>
            
        </div>
    );
}