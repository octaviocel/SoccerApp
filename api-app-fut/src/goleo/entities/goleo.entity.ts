import { ManyToOne } from 'typeorm';
import { UpdateDateColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { Equipopartido } from './../../equipopartido/entities/equipopartido.entity';
import { JoinColumn } from 'typeorm';
import { Jugador } from './../../jugador/entities/jugador.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Goleo {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'integer'})
    minuto : number;

    @Column({ name: 'jugador_id' })
    jugador_id: number;
    @ManyToOne(type => Jugador, (juga) => juga.id, {
        eager: true,
        cascade: ['update'],
        nullable: false
    })
    @JoinColumn({ name: 'jugador_id' })
    jugador: Jugador;

    @Column({ name: 'partido_id' })
    partido_id: number;

    @ManyToOne(type => Equipopartido, (juga) => juga.id, {
        eager: true,
        cascade: ['update'],
        nullable: false
    })
    @JoinColumn({ name: 'partido_id' })
    partido: Equipopartido;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}
