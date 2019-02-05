import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {Like} from "typeorm";

import {validate, ValidationError} from "class-validator";
import {Region, RegionService} from "../Region/region.service";
import {RegionEntity} from "../Region/region.entity";
import {Hacienda, HaciendaService} from "../hacienda/hacienda.service";
import {UsuarioEntity} from "./usuario.entity";
import {Usuario, UsuarioService} from "./usuario.service";
import {HaciendaEntity} from "../hacienda/hacienda.entity";
import {UsuarioCreateDto} from "./dto/usuario-create.dto";

@Controller('Usuario')
export class UsuarioController {

    haciendas: Hacienda

    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _haciendaService: HaciendaService
    ) {}


    @Get('usuario')
    async usuario(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busqueda') busqueda: string,
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
                        nombre: Like(`%${busqueda}%`)
                    },
                    {
                        direccion: Like(`%${busqueda}%`)
                    }
                ]
            };
            usuarios = await this._usuarioService.buscar(consulta);
        } else {
            usuarios = await this._usuarioService.buscar();
        }

        response.render('usuario', {
            nombre: 'David',
            arreglo: usuarios,
            mensaje: mensaje,
            accion: clase
        });
    }

    @Post('borrar/:idUsuario')
    async borrar(
        @Param('idUsuario') idUsuario: string,
        @Res() response
    ) {
        const usuarioEncontrado = await this._usuarioService
            .buscarPorId(+idUsuario);

        await this._usuarioService.borrar(Number(idUsuario));

        const parametrosConsulta = `?accion=borrar&nombre=${usuarioEncontrado.nombre}`;

        response.redirect('/Usuario/usuario' + parametrosConsulta);
    }

    @Get('crear-usuario')
    async crearUsuario(
        @Res() response
    ) {
        let haciendas:HaciendaEntity[]
        haciendas=await this._haciendaService.buscar()
        response.render(
            'crear-usuario',
            {
                arregloHaciendas:haciendas
            }
        )
    }

    @Get('actualizar-usuario/:idUsuario')
    async actualizarUsuario(
        @Param('idUsuario') idUsuario: string,
        @Res() response
    ) {
        let haciendas:HaciendaEntity[]
        haciendas=await this._haciendaService.buscar()
        const usuarioAActualizar = await this
            ._usuarioService
            .buscarPorId(Number(idUsuario));

        response.render(
            'crear-usuario', {
                usuario: usuarioAActualizar,
                arregloHaciendas:haciendas

            }
        )
    }


    @Post('actualizar-usuario/:idUsuario')
    async actualizarHaciendaFormulario(
        @Param('idUsuario') idUsuario: string,
        @Res() response,
        @Body() usuario: Usuario
    ) {
        usuario.id = +idUsuario;

        await this._usuarioService.actualizar(+idUsuario, usuario);

        const parametrosConsulta = `?accion=actualizar&nombre=${usuario.nombre}`;

        response.redirect('/Usuario/usuario' + parametrosConsulta);

    }


    @Post('crear-usuario')
    async crearHaciendaFormulario(
        @Body() usuario: Usuario,
        @Res() response
    ) {
        const usuarioValidado = new UsuarioCreateDto()

        usuarioValidado.nombre = usuario.nombre
        usuarioValidado.direccion = usuario.direccion
        usuarioValidado.telefono = usuario.telefono
        usuarioValidado.cedula = usuario.cedula
        usuarioValidado.password = usuario.password
        usuarioValidado.hacienda = usuario.hacienda


        console.log(usuarioValidado)
        const errores: ValidationError[] = await validate(usuarioValidado)

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores)
            response.redirect('/Hacienda/crear-hacienda?error=Hay errores')
        }
        else {
            const usuarioFinal = {
                id:usuario.id,
                nombre:usuario.nombre,
                direccion:usuario.direccion,
                telefono:usuario.telefono,
                cedula:usuario.cedula,
                password:usuario.password,
                hacienda:+usuario.hacienda
            }
            await this._usuarioService.crear(usuarioFinal);

            const parametrosConsulta = `?accion=crear&nombre=${usuario.nombre}`;

            response.redirect('/Usuario/usuario' + parametrosConsulta)
        }
    }
}

