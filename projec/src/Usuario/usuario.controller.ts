import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Usuario, UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {Like} from "typeorm";
import {Region} from "../Region/region.service";

@Controller('Usuario')

export class UsuarioController {

    constructor(
        private readonly __usuarioService: UsuarioService
    ) {

    }


    @Get('usuario')
    async usuario(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busqueda') busqueda: string,
        @Session() sesion
    ) {
        let mensaje; // undefined
        let clase; // undefined

        if (accion && nombre) {
            switch (accion) {
                case 'actualizar':
                    clase = 'info';
                    mensaje = `Registro ${nombre} actualizado`;
                    break;
                case 'borrar':
                    clase = 'danger';
                    mensaje = `Registro ${nombre} eliminado`;
                    break;
                case 'crear':
                    clase = 'success';
                    mensaje = `Registro ${nombre} creado`;
                    break;

            }
        }

        let usuarios: UsuarioEntity[];
        if (busqueda) {
            const consulta = {
                where: [
                    {
                        nombreUsuario: Like(`%${busqueda}%`)

                    },
                    {
                        cedulaUsuario: Like(`%${busqueda}%`)
                    }
                ]
            };

            usuarios = await this.__usuarioService.buscar(consulta);


        }
        else {
            usuarios = await this.__usuarioService.buscar();
        }
        response.render('UsuarioPantalla/crear-usuario', {
            nombreUsuario: 'Vinicio',
            arregloUsuario: usuarios,
            mensajeUsuario: mensaje,
            accionUsuario: clase

        })


    }

//CREAR USUARIO Y GUARDAR EN LA BASE DE DATOS
    @Post('crear-usuario')
    async crearRegionFormulario(
        @Body() usuario: Usuario,
        @Res() response
    ) {

        await this.__usuarioService.crear(usuario);

        const parametrosConsulta = `?accion=crear&nombre=${usuario.nombreUsuario}`;

        response.redirect('/Usuario/usuario' + parametrosConsulta)
    }


//BORRAR USUARIO

    @Post('borrar/:idUsuario')
    async borrar(
        @Param('idUsuario') idUsuario: string,
        @Res() response
    ) {
        const usuarioEncontrada = await this.__usuarioService
            .buscarPorId(+idUsuario);

        await this.__usuarioService.borrar(Number(idUsuario));

        const parametrosConsulta = `?accion=borrar&nombre=${usuarioEncontrada.nombreUsuario}`;

        response.redirect('/Usuario/usuario' + parametrosConsulta);
    }


    @Get('login')
    loginVista(
        @Res() response
    ) {
        response.render('inicioLogin/login');
    }


    @Get('home')
    homeVista(
        @Res() response
    ) {
        response.render('inicioLogin/home')
    }


    @Get('acerca')
    acercaHome(
        @Res() response
    ) {
        response.render('inicioLogin/acerca')

    }

    @Get('contactanos')
    contactanosHome(
        @Res() response
    ) {
        response.render('inicioLogin/contactanos')

    }


}
