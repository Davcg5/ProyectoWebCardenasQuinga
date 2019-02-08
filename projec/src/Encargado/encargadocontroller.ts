import {BadRequestException, Body, Controller, Get, Res, Session} from "@nestjs/common";
import {HaciendaService} from "../hacienda/hacienda.service";
import {RegionService} from "../Region/region.service";
import {EncargadoService} from "./encargado.service";
import {ParcelaService} from "../Parcela/parcela.service";
import {SubparcelaService} from "../Subparcela/subparcela.service";
import {HaciendaEntity} from "../hacienda/hacienda.entity";
import {RolEntity} from "../rol/rol.entity";
import {ParcelaEntity} from "../Parcela/parcela.entity";
import {SubparcelaEntity} from "../Subparcela/subparcela.entity";

@Controller('Encargado')
export class Encargadocontroller {

    constructor(
        private readonly _encargadoService: EncargadoService,
        private readonly _parcelaService: ParcelaService,
        private readonly _subparcelaService: SubparcelaService,
    ) {
    }


    @Get('menu')
    menuEncargado(
        @Res()
            response,
        @Session()
            sesion,
        @Body('rolUsuario') rolUsuario: number,
s     ) {
        console.log(sesion);
        sesion.rolUsuario;

        if (sesion.usuario) {

            if (sesion.rolUsuario == 2) {

                response.render('Encargado/menuEncargado', {
                    sessionUsuario: sesion.usuario
                });

            } else {
                throw new BadRequestException({mensaje: 'No puedes Ingresar con tu Usuario'})

            }


        }
        else {
            throw new BadRequestException({mensaje: 'Error Inicia Sesión'})

        }

    }

    @Get('notificaciones')
    notificaciones(
        @Res()
            response,
        @Session()
            sesion
    ) {

        if (sesion.usuario) {

            if (sesion.rolUsuario == 2) {
                response.render('Encargado/notificaciones', {
                    sessionUsuario: sesion.usuario
                });
            }
            else {
                throw new BadRequestException({mensaje: 'No puedes Ingresar con tu Usuario'})

            }


        }
        else {
            throw new BadRequestException({mensaje: 'Error Inicia Sesión'})

        }

    }


    @Get('historial')
    async historial(
        @Res()
            response,
        @Session()
            sesion
    ) {

        let parcela: ParcelaEntity[];
        parcela = await
            this._parcelaService.buscar();

        let subparcela: SubparcelaEntity[];
        subparcela = await
            this._subparcelaService.buscar();

        if (sesion.usuario) {


            if (sesion.rolUsuario == 2) {

                response.render('Encargado/historial', {
                    arregloparcela: parcela,
                    arreglosubparcela: subparcela
                });

            }
            else {
                throw new BadRequestException({mensaje: 'No puedes Ingresar con tu Usuario'})

            }

        }
        else {
            throw new BadRequestException({mensaje: 'Error Inicia Sesión'})

        }


    }


    @Get('monitoreo')
    async monitoreo(
        @Res()
            response,
        @Session()
            sesion
    ) {

        let parcela: ParcelaEntity[];
        parcela = await
            this._parcelaService.buscar();


        let subparcela: SubparcelaEntity[];
        subparcela = await
            this._subparcelaService.buscar();


        if (sesion.usuario) {

            if (sesion.rolUsuario == 2) {
                response.render('Encargado/monitoreo', {
                    arregloparcela: parcela,
                    arreglosubparcela: subparcela
                });
            }
            else {
                throw new BadRequestException({mensaje: 'No puedes Ingresar con tu Usuario'})

            }


        } else {
            throw new BadRequestException({mensaje: 'Error Inicia Sesión'})

        }


    }

}