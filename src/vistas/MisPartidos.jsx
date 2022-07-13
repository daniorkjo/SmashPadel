import React from 'react'
import '../componentes/BarraMenu.css'
import { BarraMenu } from '../componentes/BarraMenu'
import { CardMisPartidos } from '../componentes/CardMisPartidos'

export class MisPartidos extends React.Component {

    render() {

        return (
            <div>
                
                <BarraMenu />
                <CardMisPartidos/>
            </div>
        )

    }

}