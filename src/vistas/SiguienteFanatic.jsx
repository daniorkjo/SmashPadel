import React from 'react'
import '../componentes/BarraMenu.css'
import { BarraMenu } from '../componentes/BarraMenu'
import { CardSiguienteFanatic } from '../componentes/CardSiguienteFanatic'

export class SiguienteFanatic extends React.Component {

    render() {

        return (
            <div>
                
                <BarraMenu />
                <CardSiguienteFanatic/>
            </div>
        )

    }

}