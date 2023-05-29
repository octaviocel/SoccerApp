import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Liga {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    nombre: string;

    @Column({ type: 'date' })
    fechaFundacion : string;

    @Column({ type: 'text' })
    foto: string;

    @Column({ type: 'text' })
    ubicacion: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column({name :'user_id'})
    user_id: number;

    @ManyToOne(type => Usuario, (user)=> user.id, {
        eager: true,
        cascade: ['update'],
        nullable: false
    })
    @JoinColumn({name:'user_id'})
    user: Usuario;
}
