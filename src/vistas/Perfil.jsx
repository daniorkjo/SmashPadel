import React from 'react'
import { MiPerfil } from '../componentes/MiPerfil'

import '../componentes/BarraMenu.css'
import { BarraMenu } from '../componentes/BarraMenu'

export class Perfil extends React.Component {

    render() {

        return (
            <div>
                
                <BarraMenu />
                <MiPerfil />
                
            </div>
        )

    }

}
