import React from 'react'
import { CardCredencial } from '../componentes/CardCredencial'

import '../componentes/BarraMenu.css'
import { BarraMenu } from '../componentes/BarraMenu'

export class Credencial extends React.Component {

    render() {

        return (
            <div>
                
                <BarraMenu />
                <CardCredencial />
                
            </div>
        )

    }

}

