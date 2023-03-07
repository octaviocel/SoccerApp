import { ApiProperty } from '@nestjs/swagger';
import { Liga } from "src/liga/entities/liga.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Equipo {
    @ApiProperty({
        example: '001',
        description: 'Id',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Cañeritos FC',
        description: 'Nombre del equipo',
    })
    @Column({ type: 'text' })
    nombre: string;

    @ApiProperty({
        example: 'Eduardo Quiroz Garrincha',
        description: 'Nombre del entrenador del equipo',
    })
    @Column({ type: 'text' })
    entrenador: string;

    @ApiProperty({
        example: 'Campo 2, Unidad Polideportiva Oaxaca',
        description: 'Nombre del campo',
    })
    @Column({ type: 'text' })
    estadio: string;


    @Column({ type: 'text' })
    logo: string;


    @ApiProperty({
        example: 'Liga Puro Tronco',
        description: 'Nombre de la Liga',
    })

    @Column({ name: 'liga_id' })
    liga_id: number;

    @ManyToOne(type => Liga, (liga) => liga.id, {
        eager: true,
        cascade: ['update'],
        nullable: false
    })
    @JoinColumn({ name: 'liga_id' })
    liga: Liga;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}
