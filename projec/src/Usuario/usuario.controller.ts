import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Usuario, UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {Like} from "typeorm";
import {RolEntity} from "../rol/rol.entity";
import {HaciendaService} from "../hacienda/hacienda.service";
import {HaciendaEntity} from "../hacienda/hacienda.entity";
import {UsuarioCreateDto} from "./dto/usuario-create.dto";
import {validate, ValidationError} from "class-validator";
import {UsuarioUpdateDto} from "./dto/usuario-update.dto";
import {RolService} from "../rol/rol.service";
import {RolUsuarioService} from "../RolUsuario/rolUsuario.service";

@Controller('Usuario')

export class UsuarioController {

    constructor(
        private readonly __usuarioService: UsuarioService,
        private readonly _haciendaService: HaciendaService,
        private readonly _rolservice: RolService,
        private readonly _rolUsuarioservice: RolUsuarioService
    ) {


    }

    @Get('usuario')
    async usuario(
        @Res()
            response,
        @Query('accion')
            accion: string,
        @Query('nombre')
            nombre: string,
        @Query('busqueda')
            busqueda: string,
        @Session()
            sesion
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
                    },
                    {
                        direccionUsuario: Like(`%${busqueda}%`)
                    },
                    {
                        telefonoUsuario: Like(`%${busqueda}%`)
                    },
                ]
            };

            usuarios = await
                this.__usuarioService.buscar(consulta);
        }

        else {
            usuarios = await
                this.__usuarioService.buscar();
        }
        response.render('UsuarioPantalla/usuario', {
            nombreUsuario: 'Vinicio',
            arregloUsuario: usuarios,
            mensajeUsuario: mensaje,
            accionUsuario: clase,
            session: sesion.usuario

        })


    }


//se inicializa la pantalla de crear usuario
    @Get('crear-usuario')
    async crearRegion(
        @Res()
            response
    ) {


        let hacienda: HaciendaEntity[];
        hacienda = await
            this._haciendaService.buscar();

        let rol: RolEntity[];
        rol = await
            this._rolservice.buscar();

        response.render(
            'UsuarioPantalla/crear-usuario', {
                arregloRol: rol,
                arregloHacienda: hacienda

            });
    }

//CREAR USUARIO Y GUARDAR EN LA BASE DE DATOS
    @Post('crear-usuario')
    async crearRegionFormulario(
        @Body()
            usuario: Usuario,
        @Res()
            response,) {

        const usuariovalidado = new UsuarioCreateDto();
        /*
                usuariovalidado.nombreUsuario = usuario.nombreUsuario;
                usuariovalidado.cedulaUsuario = usuario.cedulaUsuario;
                usuariovalidado.direccionUsuario = usuario.direccionUsuario;
                usuariovalidado.telefonoUsuario = usuario.telefonoUsuario;
                usuariovalidado.contraseñaUsuario = usuario.contraseñaUsuario;
                usuariovalidado.hacienda = usuario.hacienda;*/


        const errores: ValidationError[] = await validate(usuariovalidado);
        const hayerrores = errores.length > 0;


        if (hayerrores) {
            response.redirect('/Usuario/crear-usuario?error= hay error');


        } else {
            console.log(usuario.rolUsuario, 1);

            this.__usuarioService.crear(usuario)
                .then((res: Usuario) => {
                    console.log(res.idUsuario);

                    console.log(usuario.rolUsuario, 444444);

                    const rolUsuarioCrear = {
                        usuarios: res.idUsuario,
                        roles: usuario.rolUsuario
                    }

                    this._rolUsuarioservice.crear(rolUsuarioCrear).then(resp => {
                        console.log('se creo')
                    })
                });


            const parametrosConsulta = `?accion=crear&nombre=${usuario.nombreUsuario}`;

            response.redirect('/Usuario/usuario' + parametrosConsulta)


        }

    }


//BORRAR USUARIO

    @Post('borrar/:idUsuario')
    async borrar(
        @Param('idUsuario')
            idUsuario: string,
        @Res()
            response) {

        const usuarioEncontrada = await
            this.__usuarioService
                .buscarPorId(+idUsuario);

        await
            this.__usuarioService.borrar(Number(idUsuario));


        const parametrosConsulta = `?accion=borrar&nombre=${usuarioEncontrada.nombreUsuario}`;

        response.redirect('/Usuario/usuario' + parametrosConsulta);
    }


/////actualizar datos del usuario

    @Get('actualizar-usuario/:idUsuario')
    async actualizarUsuario(
        @Param('idUsuario')
            idUsuario: string,
        @Res()
            response
    ) {

        const usuarioAActualizar = await
            this
                .__usuarioService
                .buscarPorId(Number(idUsuario));


        let hacienda: HaciendaEntity[];
        hacienda = await
            this._haciendaService.buscar();


        response.render(
            'UsuarioPantalla/crear-usuario', {//ir a la pantalla de crear-usuario
                usuario: usuarioAActualizar,
                arregloHacienda: hacienda
            }
        )
    }


    @Post('actualizar-usuario/:idUsuario')
    async actualizarUsuarioFormulario(
        @Param('idUsuario')
            idUsuario: string,
        @Res()
            response,
        @Body()
            usuario: Usuario
    ) {

        const usuariovalidadoU = new UsuarioUpdateDto();
        usuariovalidadoU.nombreUsuario = usuario.nombreUsuario;
        usuariovalidadoU.cedulaUsuario = usuario.cedulaUsuario;
        usuariovalidadoU.direccionUsuario = usuario.direccionUsuario;
        usuariovalidadoU.telefonoUsuario = usuario.telefonoUsuario;
        usuariovalidadoU.contraseñaUsuario = usuario.contraseñaUsuario;
        usuariovalidadoU.hacienda = usuario.hacienda;


        const errores: ValidationError[] = await validate(usuariovalidadoU);
        const hayerroresU = errores.length > 0;


        if (hayerroresU) {
            response.redirect('/Usuario/usuario?error= hay error no se pudo actualizar');


        }
        else {
            usuario.idUsuario = +idUsuario;

            await
                this.__usuarioService.actualizar(+idUsuario, usuario);

            const parametrosConsulta = `?accion=actualizar&nombre=${usuario.nombreUsuario}`;

            response.redirect('/Usuario/usuario' + parametrosConsulta);

        }

    }

    @Get()
    todos() {
        this.__usuarioService.todos().then(res => {
            console.log(res)
        })
    }


}
