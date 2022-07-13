import React, {useState} from 'react'
import { CardAmistosos } from '../componentes/CardAmistosos'

import '../componentes/BarraMenu.css'
import { BarraMenu } from '../componentes/BarraMenu'

export class Amistosos extends React.Component {

    render() {

        return (
            <div>
                
                <BarraMenu />
                <CardAmistosos />
                
            </div>
        )

    }

}
