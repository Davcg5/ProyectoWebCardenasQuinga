import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {Hacienda, HaciendaService} from "./hacienda.service";
import {Like} from "typeorm";
import {HaciendaEntity} from "./hacienda.entity";
import {HaciendaCreateDto} from "./dto/hacienda-create-dto";
import {validate, ValidationError} from "class-validator";
import {Region, RegionService} from "../Region/region.service";
import {RegionEntity} from "../Region/region.entity";

@Controller('Hacienda')
export class HaciendaController {

    regiones: Region

    constructor(
        private readonly _haciendaService: HaciendaService,
        private readonly _regionService: RegionService
    ) {}


    @Get('hacienda')
    async hacienda(
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

        let haciendas: HaciendaEntity[];
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
            haciendas = await this._haciendaService.buscar(consulta);
        } else {
            haciendas = await this._haciendaService.buscar();
        }

        response.render('hacienda', {
            nombre: 'David',
            arreglo: haciendas,
            mensaje: mensaje,
            accion: clase
        });
    }

    @Post('borrar/:idHacienda')
    async borrar(
        @Param('idHacienda') idHacienda: string,
        @Res() response
    ) {
        const haciendaEncontrada = await this._haciendaService
            .buscarPorId(+idHacienda);

        await this._haciendaService.borrar(Number(idHacienda));

        const parametrosConsulta = `?accion=borrar&nombre=${haciendaEncontrada.nombre}`;

        response.redirect('/Hacienda/hacienda' + parametrosConsulta);
    }

    @Get('crear-hacienda')
    async crearHacienda(
        @Res() response
    ) {
        let regiones:RegionEntity[]
        regiones=await this._regionService.buscar()
        response.render(
            'crear-hacienda',
            {
                arregloRegiones:regiones
            }
        )
    }

    @Get('actualizar-hacienda/:idHacienda')
    async actualizarHacienda(
        @Param('idHacienda') idHacienda: string,
        @Res() response
    ) {
        const haciendaAActualizar = await this
            ._haciendaService
            .buscarPorId(Number(idHacienda));

        response.render(
            'crear-hacienda', {
                hacienda: haciendaAActualizar
            }
        )
    }


    @Post('actualizar-hacienda/:idHacienda')
    async actualizarHaciendaFormulario(
        @Param('idHacienda') idHacienda: string,
        @Res() response,
        @Body() hacienda: Hacienda
    ) {
        hacienda.id = +idHacienda;

        await this._haciendaService.actualizar(+idHacienda, hacienda);

        const parametrosConsulta = `?accion=actualizar&nombre=${hacienda.nombre}`;

        response.redirect('/Hacienda/hacienda' + parametrosConsulta);

    }


    @Post('crear-hacienda')
    async crearHaciendaFormulario(
        @Body() hacienda: Hacienda,
        @Res() response
    ) {
        const haciendaValidada = new HaciendaCreateDto()

        haciendaValidada.nombre = hacienda.nombre
        haciendaValidada.direccion = hacienda.direccion
        haciendaValidada.telefono = hacienda.telefono

        const errores: ValidationError[] = await validate(haciendaValidada)

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores)
            response.redirect('/Hacienda/crear-hacienda?error=Hay errores')
        }
        else {
            await this._haciendaService.crear(hacienda);

            const parametrosConsulta = `?accion=crear&nombre=${hacienda.nombre}`;

            response.redirect('/Hacienda/hacienda' + parametrosConsulta)
        }
    }
}

