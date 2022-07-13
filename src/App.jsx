import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './componentes/BarraMenu.css'

import { BarraMenu } from './componentes/BarraMenu'
import { IniciarSesion } from './vistas/IniciarSesion'
import { Home } from './vistas/Home'
import { Registrarse } from './vistas/Registrarse'
import { Amistosos } from './vistas/Amistosos'
import { CrearAmistoso } from './vistas/CrearAmistoso'
import { CrearFanatics } from './vistas/CrearFanatics'
import { Fanatics } from './vistas/Fanatics'
import { Ligas } from './vistas/Ligas'
import { Perfil } from './vistas/Perfil'
import { Credencial } from './vistas/Credencial'
import { MisPartidos } from './vistas/MisPartidos'
import { MisAmistosos } from './vistas/MisAmistosos'
import { MisFanatics } from './vistas/MisFanatics'
import { ClasificacionFanatic } from './vistas/ClasificacionFanatic'
import { SiguienteFanatic } from './vistas/SiguienteFanatic'
import { auth } from './firebaseconfig'

function App() {

  return (
    <div >

        <div className="ImagenFondo">
          <Switch>        
          
            <Route exact path='/' component={Home} />
            <Route exact path='/IniciarSesion' component={IniciarSesion} />
            <Route exact path='/Registrarse' component={Registrarse} />
            <Route exact path='/Amistosos' component={Amistosos} />
            <Route exact path='/CrearAmistoso' component={CrearAmistoso} />
            <Route exact path='/CrearFanatics' component={CrearFanatics} />
            <Route exact path='/Fanatics' component={Fanatics} />
            <Route exact path='/Ligas' component={Ligas} />
            <Route exact path='/Perfil' component={Perfil} />
            <Route exact path='/Credenciales' component={Credencial} />    
            <Route exact path='/MisPartidos' component={MisPartidos} />
            <Route exact path='/MisFanatics' component={MisFanatics} /> 
            <Route exact path='/MisAmistosos' component={MisAmistosos} />     
            <Route exact path='/ClasificacionFanatic/:id' component={ClasificacionFanatic} />
            <Route exact path='/SiguienteFanatic/:id' component={SiguienteFanatic} />

          </Switch>
        </div>    
    </div>

  )
}

export default App;
