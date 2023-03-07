import { Rol } from './entities/rol.entity';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';


@Injectable()
export class RolService {

  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

  ) { }

  async create(createRolDto: CreateRolDto) {

    try {

      const { descripcion } = createRolDto;

      const rol = this.rolRepository.create({
        descripcion: descripcion,
      })

      await this.rolRepository.save(rol);

      return { ...rol }
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll() {
    return await this.rolRepository.find();
  }

  async findOne(id: number) {

    const rol = await this.rolRepository.findOneBy({ id });

    if (!rol) {
      throw new NotFoundException(`Rol not Found code ${id}`)
    }

    return rol;
  }

  async update(id: number, updateRolDto: UpdateRolDto) {
    const rol = await this.findOne(id)
    if (!rol) {
      throw new NotFoundException(`Rol not Found code ${id}`)
    }
    await this.rolRepository.update(id, updateRolDto);

    return { message: "Rol updated" }
  }

  async remove(id: number) {
    const rol = await this.findOne(id);

    if (!rol) {
      throw new NotFoundException("Fail Updating")
    }

    await this.rolRepository.delete(rol);

    return { message: "Delete Succesfully" }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Intentalo de nuevo mas terde');
  }
}
