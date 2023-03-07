import { NotFoundException } from '@nestjs/common/exceptions';
import { Rol } from './../rol/entities/rol.entity';
import { Usuario } from './entities/usuario.entity';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const { password, ...data } = createUsuarioDto;

      const user = this.userRepository.create({
        password: bcrypt.hashSync(password, 10),
        ...data,
      });

      await this.userRepository.save(user)

      return { user }
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User not Found code ${id}`)
    }

    return user;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id)

    await this.userRepository.update(id, updateUsuarioDto);

    return { message: "User updated" }
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException("Fail Removing")
    }
    
    await this.userRepository.delete(user);

    return { message: "Delete Succesfully" }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Intentalo de nuevo mas terde');
  }
}
