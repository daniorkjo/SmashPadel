import React from 'react'
import '../componentes/BarraMenu.css'
import { BarraMenu } from '../componentes/BarraMenu'
import { CardMisFanatics} from '../componentes/CardMisFanatics'

export class MisFanatics extends React.Component {

    render() {

        return (
            <div>
                
                <BarraMenu />
                <CardMisFanatics/>
            </div>
        )

    }

}