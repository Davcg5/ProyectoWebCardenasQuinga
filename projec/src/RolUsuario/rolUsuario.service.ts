import {Injectable} from "@nestjs/common";
import {RolUsuarioEntity} from "./rolUsuario.entity";
import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {RegionEntity} from "../Region/region.entity";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {Usuario} from "../Usuario/usuario.service";
import {RolEntity} from "../rol/rol.entity";

@Injectable()
export class RolUsuarioService {

    constructor(
        @InjectRepository(RolUsuarioEntity)
        private readonly _rolUsuarioRepository: Repository<RolUsuarioEntity>,
    ) {
    }

    buscar(parametros?: FindManyOptions<RolUsuarioEntity>)
        : Promise<RolUsuarioEntity[]> {
        return this._rolUsuarioRepository.find(parametros);
    }


    async crear(rolUsuario:any): Promise<RolUsuarioEntity> {


        // Instanciar una entidad -> .create()
        //const rolUsuarioEntity = this._rolUsuarioRepository.create();

        const rolUsuarioCreado = await this._rolUsuarioRepository.save(rolUsuario);
        return rolUsuarioCreado;

    }


}

export interface RolesUsuario {
     usuarios:number,

}