import { Equipo } from './../../equipo/entities/equipo.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Jugador {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    nombre: string;

    @Column({ type: 'text' })
    apePat: string;

    @Column({ type: 'text' })
    apeMat: string;

    @Column({ type: 'date' })
    fechaNacimiento: string;

    @Column({ type: 'double precision' })
    altura: number;

    @Column({ type: 'double precision' })
    peso: number;

    @Column({ type: 'integer' })
    numero: number;

    @Column({ type: 'text' })
    foto: string;

    @Column({ name: 'equipo_id' })
    equipo_id: number;

    @ManyToOne(type => Equipo, (equi) => equi.id, {
        eager: true,
        cascade: ['update'],
        nullable: false
    })
    @JoinColumn({ name: 'equipo_id' })
    equipo: Equipo;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}
