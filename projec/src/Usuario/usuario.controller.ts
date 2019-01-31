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
        // if(sesion.){
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

        let usuario: UsuarioEntity[];
        if (busqueda) {
            const consulta = {
                where: [
                    {
                        nombre: Like(`%${busqueda}%`)

                    },
                    {
                        cedula: Like(`%${busqueda}%`)
                    }
                ]
            };

            usuario = await this.__usuarioService.buscar(consulta);


        }
        else {
            usuario = await this.__usuarioService.buscar();
        }
        response.render('usuario',{
            nombre: 'Vinicio',
            arreglo: usuario,
            mensaje: mensaje,
            accion: clase

        });

        //}
        //else{
        //throw new ForbiddenException({mensaje:'No puedes entrar'});

        //}
    }

    @Post('borrar/:idUsuario')
    async borrarUsuario(
        @Param('idUsuario') idUsuario: string,
        @Res() response
    ) {
        const usuarioEncontrado = await this.__usuarioService.buscarPorId(+idUsuario)
        const parametrosConsulta = `?accion=borrar&nombre=${usuarioEncontrado.nombreUsuario}`
        response.redirect('Usuario/usuario' + parametrosConsulta)

    }


    @Get('CrearUsuario')
    crearUsuario(
        @Res() response
    ) {
        response.render('UsuarioPantalla/crearUsuario')

    }


    @Get('actualizar-Usuario/:idUsuario')
    async actualizarUsuario(
        @Param('idUsuario') idUsuario: string,
        @Res() response
    ) {
        const usuarioAActualizar = await this.__usuarioService
            .buscarPorId(Number(idUsuario));

        response.render(
            'crear-usuario', {
                region: usuarioAActualizar
            }
        )
    }


    @Post('actualizar-usuario/:idRegion')
    async actualizarUsuarioFormulario(
        @Param('idUsuario') idUsuario: string,
        @Res() response,
        @Body() usuario: Usuario
    ) {
        usuario.idUsuario = +idUsuario;

        await this.__usuarioService.actualizar(+idUsuario, usuario);

        const parametrosConsulta = `?accion=actualizar&nombre=${usuario.nombreUsuario}`;

        response.redirect('/Usuario/usuario' + parametrosConsulta);

    }


    @Post('crear-usuario')
    async crearUsuarioFormulario(
        @Body() usuario: Usuario,
        @Res() response
    ) {

        await this.__usuarioService.crear(usuario);

        const parametrosConsulta = `?accion=crear&nombre=${usuario.nombreUsuario}`;

        response.redirect('/Usuario/CrearUsuario' + parametrosConsulta)
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
