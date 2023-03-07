import { NotFoundException } from '@nestjs/common/exceptions';
import { Goleo } from './entities/goleo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateGoleoDto } from './dto/create-goleo.dto';
import { UpdateGoleoDto } from './dto/update-goleo.dto';
import { Repository } from 'typeorm';

@Injectable()
export class GoleoService {

  constructor(
    @InjectRepository(Goleo)
    private readonly goleoRepository: Repository<Goleo>,

  ) { }

  async create(createGoleoDto: CreateGoleoDto) {
    try {
      const { ...data } = createGoleoDto;

      const gol = this.goleoRepository.create({
        ...data,
      })

      await this.goleoRepository.save(gol);

      return { message: "Goal Added" }
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll() {
    return await this.goleoRepository.find();
  }

  async findOne(id: number) {

    const gol = await this.goleoRepository.findOneBy({ id });

    if (!gol) {
      throw new NotFoundException(`Goal not Found code ${id}`)
    }

    return gol;
  }

  async update(id: number, updateGoleoDto: UpdateGoleoDto) {
    const gol = await this.findOne(id)

    if (!gol) {
      throw new NotFoundException("Fail Updating")
    }

    await this.goleoRepository.update(id, updateGoleoDto);

    return { message: "Goal updated" }
  }

  async remove(id: number) {
    const gol = await this.findOne(id);

    if (!gol) {
      throw new NotFoundException("Fail Updating")
    }

    await this.goleoRepository.delete(gol);

    return { message: "Delete Succesfully" }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Intentalo de nuevo mas terde');
  }
}
