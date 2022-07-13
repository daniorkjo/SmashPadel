import React from 'react'
import { CardClasificacionFanatic } from '../componentes/CardClasificacionFanatic'

import '../componentes/BarraMenu.css'
import { BarraMenu } from '../componentes/BarraMenu'

export class ClasificacionFanatic extends React.Component {

    render() {

        return (
            <div>
                
                <BarraMenu />
                <CardClasificacionFanatic />
                
            </div>
        )

    }

}