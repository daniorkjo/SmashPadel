import React from 'react'
import { CardLigas } from '../componentes/CardLigas'

import '../componentes/BarraMenu.css'
import { BarraMenu } from '../componentes/BarraMenu'

export class Ligas extends React.Component {

    render() {

        return (
            <div>
                
                <BarraMenu />
                <CardLigas />
                
            </div>
        )

    }

}
