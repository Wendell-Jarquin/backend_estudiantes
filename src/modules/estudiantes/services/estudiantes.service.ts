import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from '../entities/estudiante.entity';
import { Repository } from 'typeorm';
import { CreateEstudianteDto } from '../dto/estudiante.dto';
import { Etnia } from 'src/modules/etnias/entities/etnia.entity';
import { Sexo } from 'src/modules/sexos/entities/sexo.entity';
import { UpdateEstudianteDto } from '../dto/estudiante.dto';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepo: Repository<Estudiante>,
    @InjectRepository(Etnia)
    private readonly etniaRepo: Repository<Etnia>,
    @InjectRepository(Sexo)
    private readonly sexoRepo: Repository<Sexo>,
  ) { }

  async getAll() {
    // Devuelve todos los estudiantes como JSON
    return await this.estudianteRepo.find();
  }

  async getOne(id: number) {
    // Devuelve un estudiante por id como JSON
    const estudiante = await this.estudianteRepo.findOne({ where: { id } });
    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }
    return estudiante;
  }

  async create(estudianteDto: CreateEstudianteDto) {
    try {
      const estudiante = this.estudianteRepo.create(estudianteDto);

      return await this.estudianteRepo.save(estudiante);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, estudianteDto: UpdateEstudianteDto) {
    try {
      const estudiante = await this.estudianteRepo.preload({
        id,
        ...estudianteDto,
      });

      if (!estudiante) {
        throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
      }

      return await this.estudianteRepo.save(estudiante);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async delete(id: number) {
    try {
      const exists = await this.estudianteRepo.existsBy({ id });
      if (!exists) {
        throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
      }
      await this.estudianteRepo.delete(id);
    } catch (error) {
      this.handleDBException(error);
    }
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
