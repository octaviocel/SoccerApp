import { NotFoundException } from '@nestjs/common/exceptions';
import { Liga } from './entities/liga.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateLigaDto } from './dto/create-liga.dto';
import { UpdateLigaDto } from './dto/update-liga.dto';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class LigaService {
  constructor(
    @InjectRepository(Liga)
    private readonly ligaRepository: Repository<Liga>
  ) { }

  async create(createLigaDto: CreateLigaDto) {
    try {
      const { ...data } = createLigaDto;

      const liga = this.ligaRepository.create({
        ...data,
      });

      await this.ligaRepository.save(liga)

      return { liga }
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll(){
    return await this.ligaRepository.find();
  }

  async findAllLimit() {

    const query = await this.ligaRepository
      .createQueryBuilder('liga')
      .select(["*"])
      //.leftJoinAndSelect('liga.', 'equipo')
      .addSelect("(SELECT COUNT(*) FROM equipo WHERE equipo.liga_id = liga.id)", "totalEquipos")
      .limit(3)
      .getRawMany();
    //.getMany();

    return query;
    //return await this.ligaRepository.find();

  }

  async findOne(id: number) {
    const user = await this.ligaRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`League not Found code ${id}`)
    }

    return user;
  }

  async update(id: number, updateLigaDto: UpdateLigaDto) {
    const league = await this.findOne(id)

    if (!league) {
      throw new NotFoundException(`Player not Found code ${id}`)
    }

    await this.ligaRepository.update(id, updateLigaDto);

    return { message: "League updated" }
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException("Fail Removing")
    }

    await this.ligaRepository.delete(user);

    return { message: "Delete Succesfully" }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Intentalo de nuevo mas terde');
  }


}
