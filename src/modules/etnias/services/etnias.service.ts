import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Etnia } from '../entities/etnia.entity';

@Injectable()
export class EtniasService {
  constructor(
    @InjectRepository(Etnia)
    private readonly etniaRepo: Repository<Etnia>,
  ) {}

  async getAll() {
    return await this.etniaRepo.find();
  }

  async getOne(id: number) {
    const etnia = await this.etniaRepo.findOne({ where: { id } });
    if (!etnia) {
      throw new NotFoundException(`Etnia con id ${id} no encontrado`);
    }
    return etnia;
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
