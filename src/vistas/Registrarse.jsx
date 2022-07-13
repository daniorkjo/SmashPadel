import React from 'react'
import { BarraMenu } from '../componentes/BarraMenu.jsx'
import {FormRegistroUsuario} from '../componentes/FormRegistroUsuario.jsx'

export class Registrarse extends React.Component {

    render(){
        return(
            <div >

                <BarraMenu />
                <FormRegistroUsuario />

            </div>
        )
    }

}