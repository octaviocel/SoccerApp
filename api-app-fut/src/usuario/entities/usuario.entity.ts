import { ApiProperty } from "@nestjs/swagger";
import { Liga } from "src/liga/entities/liga.entity";
import { Rol } from "src/rol/entities/rol.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Usuario {
    @ApiProperty({
        example: '001',
        description: 'Id',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Octavio',
        description: 'Nombre del usuario',
    })
    @Column({ type: 'text' })
    nombre: string;

    
    @ApiProperty({
        example: 'Celaya',
        description: 'Apellido del usuario',
    })
    @Column()
    apepat: string;

    @ApiProperty({
        example: 'Celaya',
        description: 'Apellido del usuario',
    })
    @Column({ type: 'text' })
    apemat: string;

    @ApiProperty({
        example: 'octavio@gmail.com',
        description: 'correo del usuario',
    })
    @Column({ type: 'text', unique: true })
    email: string;

    @ApiProperty({
        example: '*********',
        description: 'Contraseña del usuario',
    })
    @Column({ type: 'text', select: false })
    password: string;

    @Column({name :'rol_id'})
    rol_id: number;

    @ApiProperty({
        example: 'Administrador',
        description: 'Rol del usuario que permite sus accesos',
    })
    @ManyToOne(type => Rol, (rol)=> rol.id, {
        eager: true,
        cascade: ['update'],
        nullable: false
    })
    @JoinColumn({name:'rol_id'})
    role: Rol;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToMany(() => Liga, (liga) => liga.user)
    usuarios: Usuario[];
}
