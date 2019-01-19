import {BeforeInsert, ManyToOne, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {HaciendaEntity} from "../hacienda/hacienda.entity";
@Entity('region')
export class RegionEntity {

    @PrimaryGeneratedColumn()
    idRegion: number;

    @Index()
    @Column(
        {
            name: 'nombreRegion',
            type: 'varchar',
            length: 50,
            default: 'region'
        }
    )
    nombreRegion: string;

    @Column({
        nullable: false,
    })
    descripcionRegion: string;

    @Column({
        nullable: false
    })
    telefonoHacienda: string;

    @Column({
        nullable: false
    })
    password: string;
    @OneToMany(
        type => HaciendaEntity, // Tipo de Dato Un Usuario a muchos

        hacienda => hacienda.region // Cual es el campo FK
    )
    haciendas: HaciendaEntity[]
}