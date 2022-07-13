import React from 'react'
import { FormCrearFanatics } from '../componentes/FormCrearFanatics'

import '../componentes/BarraMenu.css'
import { BarraMenu } from '../componentes/BarraMenu'

export class CrearFanatics extends React.Component {

    render() {

        return (
            <div>
                
                <BarraMenu />
                <FormCrearFanatics />
                
            </div>
        )

    }

}
