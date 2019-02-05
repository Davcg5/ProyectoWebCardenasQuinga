import {Injectable} from "@nestjs/common";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {FindManyOptions, Repository} from "typeorm";
import {RolEntity} from "./rol.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()

export class RolService {
    constructor(
        @InjectRepository(RolEntity)
        private readonly _rolRepository: Repository<RolEntity>
    ) {}


    buscar(parametros?: FindManyOptions<RolEntity>): Promise<RolEntity[]> {
        return this._rolRepository.find(parametros)
    }

}