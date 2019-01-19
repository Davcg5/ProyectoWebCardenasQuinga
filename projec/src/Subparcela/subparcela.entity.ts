import {BeforeInsert, ManyToOne, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";


import {ParcelaEntity} from "../Parcela/parcela.entity";
import {SensorEntity} from "../Sensor/sensor.entity";

@Entity('subparcela')

export class SubparcelaEntity {

    @PrimaryGeneratedColumn()
    idSubparcela: number;

    @Index()
    @Column(
        {
            name: 'codigoSubparcela',
            type: 'varchar',
            length: 10,
            default: 'subparcela'
        }
    )
    codigoSubparcela: string;

    @Column({
        nullable: false,
    })
    medidasSubparcela: string;


    @BeforeInsert()
    antesDeInsertar() {
        console.log('Ejecutandome antes de insertar');
    }

    @BeforeInsert()
    verificarFuncion() {
        console.log('Ejecuta despues de antes de insertar');
    }

    @ManyToOne(
        type => ParcelaEntity, // Tipo de Dato Un Usuario a muchos

        parcela => parcela.subparcelas // Cual es el campo FK
    )
    parcelas: ParcelaEntity;
@OneToMany(
    type => SensorEntity,
    sensor => sensor.subparcela
)
sensores: SensorEntity[]
}