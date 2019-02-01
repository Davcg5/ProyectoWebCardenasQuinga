import {Injectable} from "@nestjs/common";
import {UsuarioEntity} from "./usuario.entity";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";


@Injectable()

export class UsuarioService {


    // Inyectar Dependencias
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>
    ) {
    }

    //buscar
    buscar(parametros?: FindManyOptions<UsuarioEntity>): Promise<UsuarioEntity[]> {
        return this._usuarioRepository.find(parametros)
    }


    async crear(nuevoUsuario: Usuario): Promise<UsuarioEntity> {

        // Instanciar una entidad -> .create()
        const usuarioEntity = this._usuarioRepository.create(nuevoUsuario);
        const usuarioCreado = await this._usuarioRepository.save(usuarioEntity);
        return usuarioCreado;

    }


    actualizar(idUsuario: number, nuevoUsuario: Usuario): Promise<UsuarioEntity> {

        nuevoUsuario.idUsuario = idUsuario;
        const usuarioEntity = this._usuarioRepository.create(nuevoUsuario);
        return this._usuarioRepository.save(usuarioEntity)
    }

    borrar(idUsuario: number): Promise<UsuarioEntity> {
        const usuarioEntityAEliminar = this._usuarioRepository.create({
            idUsuario: idUsuario
        });
        return this._usuarioRepository.remove(usuarioEntityAEliminar)
    }

    buscarPorId(idUsuario: number): Promise<UsuarioEntity> {
        return this._usuarioRepository.findOne(idUsuario)
    }


    async login(username: string, password: string)
        : Promise<boolean> {
        // 1) Buscar al usuario por username
        // 2) Comparar si el password es igual al password

        const usuarioEncontrado = await this._usuarioRepository
            .findOne({
                where: {
                    cedulaUsuario: username
                }
            });
        if (usuarioEncontrado) {

            if (usuarioEncontrado.contraseñaUsuario === password) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }


    }


}


export interface Usuario {
    idUsuario: number;
    nombreUsuario: string;
    cedulaUsuario: string;
    direccionUsuario: string;
    telefonoUsuario?: string;
    contraseñaUsuario: string;
}