import React from 'react'
import { CardFanatics } from '../componentes/CardFanatics'

import '../componentes/BarraMenu.css'
import { BarraMenu } from '../componentes/BarraMenu'

export class Fanatics extends React.Component {

    render() {

        return (
            <div>
                
                <BarraMenu />
                <CardFanatics />
                
            </div>
        )

    }

}
