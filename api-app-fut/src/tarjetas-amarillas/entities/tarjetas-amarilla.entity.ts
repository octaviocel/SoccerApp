import { ManyToOne } from 'typeorm';
import { UpdateDateColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { Equipopartido } from './../../equipopartido/entities/equipopartido.entity';
import { Jugador } from './../../jugador/entities/jugador.entity';
import { JoinColumn } from 'typeorm';
import { OneToOne } from 'typeorm';
import { Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
export class TarjetasAmarilla {

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
