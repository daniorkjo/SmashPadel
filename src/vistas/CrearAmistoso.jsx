import React from 'react'
import { FormCrearAmistoso } from '../componentes/FormCrearAmistoso'

import '../componentes/BarraMenu.css'
import { BarraMenu } from '../componentes/BarraMenu'

export class CrearAmistoso extends React.Component {

    render() {

        return (
            <div>
                
                <BarraMenu />
                <FormCrearAmistoso />
                
            </div>
        )

    }

}
