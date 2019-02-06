import {Injectable} from "@nestjs/common";
import {RolUsuarioEntity} from "./rolUsuario.entity";
import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {RegionEntity} from "../Region/region.entity";

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


}