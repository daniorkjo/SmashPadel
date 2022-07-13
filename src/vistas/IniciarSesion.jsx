import React from 'react'
import { CardInicioSesion} from '../componentes/CardInicioSesion'

import '../componentes/BarraMenu.css'
import { BarraMenu } from '../componentes/BarraMenu'

export class IniciarSesion extends React.Component {


    render() {

        return (
            <div>
                
                <BarraMenu />
                <CardInicioSesion />
                
            </div>
        )

    }

}
