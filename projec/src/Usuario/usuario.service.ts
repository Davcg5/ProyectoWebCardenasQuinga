import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';

import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";
import {UsuarioEntity} from "./usuario.entity";

@Injectable()
export class UsuarioService {

    // Inyectar Dependencias
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>,
    ) {
    }

    buscar(parametros?: FindManyOptions<UsuarioEntity>)
        : Promise<UsuarioEntity[]> {
        return this._usuarioRepository.find(parametros);
    }

    async crear(nuevoUsuario: Usuario): Promise<UsuarioEntity> {

        const usuarioEntity = this._usuarioRepository
            .create(nuevoUsuario);
        console.log(nuevoUsuario)
        const haciendaCreada = await this._usuarioRepository
            .save(usuarioEntity);


        return haciendaCreada;
    }

    actualizar(idUsuario: number,
               nuevoUsuario: Usuario): Promise<UsuarioEntity> {

        nuevoUsuario.id = idUsuario;

        const usuarioEntity = this._usuarioRepository.create(nuevoUsuario);

        return this._usuarioRepository.save(usuarioEntity);
    }

    borrar(idUsuario: number): Promise<UsuarioEntity> {

        // CREA UNA INSTANCIA DE LA ENTIDAD
        const usuarioEntityAEliminar = this._usuarioRepository
            .create({
                id: idUsuario
            });


        return this._usuarioRepository.remove(usuarioEntityAEliminar)
    }

    buscarPorId(idUsuario: number): Promise<UsuarioEntity> {
        return this._usuarioRepository.findOne(idUsuario);
    }




}

export interface Usuario {
    id: number;
    cedula:string;
    nombre: string;
    direccion: string;
    telefono:string;
    hacienda:any;
    password:string;
}