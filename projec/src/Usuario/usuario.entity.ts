import {BeforeInsert, ManyToOne, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, ManyToMany} from "typeorm";
import {RegionEntity} from "../Region/region.entity";
import {HaciendaEntity} from "../hacienda/hacienda.entity";
import {ParcelaEntity} from "../Parcela/parcela.entity";
import {RolEntity} from "../rol/rol.entity";

@Entity('usuario')

export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column(
        {
            name: 'nombreUsuario',
            type: 'varchar',
            length: 50,
            default: 'usuario'
        }
    )
    nombre: string;

    @Column({
        nullable: false,
    })
    cedula: string;

    @Column({
        nullable: false
    })
    direccion: string;

    @Column({
        nullable: false
    })
    telefono: string;

    @Column({
        nullable: false
    })
    password: string;

    @BeforeInsert()
    antesDeInsertar() {
        console.log('Ejecutandome antes de insertar');
    }

    @BeforeInsert()
    verificarFuncion() {
        console.log('Ejecuta despues de antes de insertar');
    }
    @ManyToMany(
        type => RolEntity
    )
    @ManyToOne(
        type => HaciendaEntity, // Tipo de Dato Un Usuario a muchos

        hacienda => hacienda.usuarios // Cual es el campo FK
    )
    hacienda: HaciendaEntity

    @OneToMany(
        type => ParcelaEntity, // Tipo de Dato Un Usuario a muchos

        parcela => parcela.usuario // Cual es el campo FK
    )
    parcelas: ParcelaEntity[]

}
