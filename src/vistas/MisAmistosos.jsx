import React from 'react'
import '../componentes/BarraMenu.css'
import { BarraMenu } from '../componentes/BarraMenu'
import { CardMisAmistosos } from '../componentes/CardMisAmistosos'

export class MisAmistosos extends React.Component {

    render() {

        return (
            <div>
                
                <BarraMenu />
                <CardMisAmistosos/>
            </div>
        )

    }

}