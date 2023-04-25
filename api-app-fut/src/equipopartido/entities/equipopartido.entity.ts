import { ManyToOne } from 'typeorm';
import { Equipo } from './../../equipo/entities/equipo.entity';
import { Usuario } from './../../usuario/entities/usuario.entity';
import { UpdateDateColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { OneToOne } from 'typeorm';
import { Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
export class Equipopartido {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({ name: 'arbitro_id' })
    arbitro_id: number;
    @ManyToOne(type => Usuario, (user) => user.id, {
        eager: true,
        cascade: ['update'],
        nullable: false
    })
    @JoinColumn({ name: 'arbitro_id' })
    arbitro: Usuario;

    @Column({ name: 'local_id' })
    local_id: number;
    @ManyToOne(type => Equipo, (equi) => equi.id, {
        eager: true,
        cascade: ['update'],
        nullable: false
    })
    @JoinColumn({ name: 'local_id' })
    equipoLocal: Equipo;

    @Column({ name: 'visita_id' })
    visita_id: number;
    @ManyToOne(type => Equipo, (equi1) => equi1.id, {
        eager: true,
        cascade: ['update'],
        nullable: false
    })
    @JoinColumn({ name: 'visita_id' })
    equipoVisita: Equipo;

    @Column({ type: 'date' })
    fecha : string;

    @Column({ type: 'time', precision: 0 })
    hora: string;

    @Column({ type: 'integer' })
    golesLocal: number;

    @Column({ type: 'integer' })
    golesVisita: number;

    @Column({ type: 'text' })
    observaciones: string;

    @Column()
    finalizado: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}
