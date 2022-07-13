import React from 'react'
import '../componentes/BarraMenu.css'
import {
    Card
} from 'react-bootstrap'
import juanLebron from '../imagenes/juan-lebron.gif'
import { BarraMenu } from '../componentes/BarraMenu'
import { auth } from '../firebaseconfig'

export class Home extends React.Component {


    render() {

        return (
            <div>
                <BarraMenu />
                <div className="DivMitadAnchuraIzq AlinearCentro">

                    <Card className="CardMinimo">
                    {/* style={{ width: '18rem'}} */}
                        <Card.Body>
                            <h4 className="AlinearCentroHorizontal">Smash Pádel</h4>
                            <Card.Text>
                                Página web para organizar partidos entre clubs y aficionados al pádel
                        </Card.Text>
                        </Card.Body>
                    </Card>

                </div>
                <div className="DivMitadAnchuraDer AlinearCentro" >

                    <img src={juanLebron} alt="loading..." /> 
                    

                </div>
            </div>
        )

    }

}