import React, { useEffect, useState } from 'react'
import {
    Navbar,
    Nav,
    NavDropdown
} from 'react-bootstrap'
import logo from '../imagenes/smash_padel.svg'
import usuarioImagen from '../imagenes/usuario.svg'
import './BarraMenu.css'
import { auth } from '../firebaseconfig'

export const BarraMenu = (props) => {


    const [usuario, setUsuario] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUsuario(user.email)
            }
        })
    }, [])
    

    const CerrarSesion = () => {
        auth.signOut()
        setUsuario(null)
    }
    
    return (
        <Navbar id="MenuColor" expand="lg" >
            <Navbar.Brand href="/"><img src={logo} className="App-logo" alt="logo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" >
                    <Nav.Link href="/Amistosos">Amistosos</Nav.Link>
                    <Nav.Link href="/Fanatics">Fanatics</Nav.Link>

                </Nav>
                {
                    usuario ?
                        (
                            <Nav className="ml-auto" >
                                {/* en el title, tengo que poner el nombre*/}
                                <NavDropdown title="Mi cuenta" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/Perfil">Mi perfil</NavDropdown.Item>
                                    <NavDropdown.Item href="/Credenciales">Mis Credenciales</NavDropdown.Item>
                                    <NavDropdown.Item href="/MisPartidos">Mis Partidos</NavDropdown.Item>
                                    
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={CerrarSesion} href="/">Cerrar Sesion</NavDropdown.Item>
                                </NavDropdown>
                                <Navbar.Brand><img src={usuarioImagen} className="App-logo" alt="Usuario" /></Navbar.Brand>
                            </Nav>
                        )
                        :
                        (
                            <Nav className="ml-auto" >
                                <Nav.Link href="/IniciarSesion">Iniciar Sesion</Nav.Link>
                                <Nav.Link href="/Registrarse">Registrarse</Nav.Link>
                            </Nav>

                        )
                }

            </Navbar.Collapse>
        </Navbar>
    );
}

