import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sexo } from '../entities/sexo.entity';

@Injectable()
export class SexosService {
  constructor(
    @InjectRepository(Sexo)
    private readonly sexoRepo: Repository<Sexo>,
  ) {}

  async getAll() {
    return await this.sexoRepo.find();
  }

  async getOne(id: number) {
    const sexo = await this.sexoRepo.findOne({ where: { id } });
    if (!sexo) {
      throw new NotFoundException(`Sexo con id ${id} no encontrado`);
    }
    return sexo;
  }

  private handleDBException(error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.error(error);

    throw new InternalServerErrorException(
      'Error inesperado, verifique los registros del servidor',
    );
  }
}