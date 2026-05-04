import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  // Post,
  Put,
} from '@nestjs/common';
import { EstudiantesService } from '../services/estudiantes.service';
import {
  CreateEstudianteDto,
  UpdateEstudianteDto,
} from '../dto/estudiante.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudianteService: EstudiantesService) { }


  @Get()
  getAll() {
    return this.estudianteService.getAll();
  }

  @MessagePattern({ cmd: 'get_all_students' })
  async getAllStudents() {
    return await this.estudianteService.getAll();
  }


  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.estudianteService.getOne(id);
  }

  @MessagePattern({ cmd: 'get_one_student' })
  async getOneStudent(@Payload() id: number) {
    const parsedId = Number(id);
    return await this.estudianteService.getOne(parsedId);
  }

  // @Post()
  @MessagePattern({ cmd: 'create_student' })
  async create(@Payload() estudianteDto: CreateEstudianteDto) {
    const estudiante = await this.estudianteService.create(estudianteDto);

    const datos = {
      data: estudiante,
      message: 'Registro agregado con exito',
    };

    return datos;
  }


  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() estudianteDto: UpdateEstudianteDto,
  ) {
    const estudiante = await this.estudianteService.update(id, estudianteDto);

    const datos = {
      data: estudiante,
      message: 'Registro actualizado con exito',
    };

    return datos;
  }

  @MessagePattern({ cmd: 'update_student' })
  async updateStudent(
    @Payload()
    payload: { id: number; estudianteDto?: UpdateEstudianteDto } &
      UpdateEstudianteDto,
  ) {
    const { id, estudianteDto, ...flatDto } = payload;
    const updateDto = estudianteDto ?? flatDto;
    const parsedId = Number(id);
    const estudiante = await this.estudianteService.update(parsedId, updateDto);
    return {
      data: estudiante,
      message: 'Registro actualizado con exito',
    };
  }


  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.estudianteService.delete(id);

    return {
      message: 'Registro eliminado con exito',
    };
  }

  @MessagePattern({ cmd: 'remove_student' })
  async removeStudent(@Payload() id: number) {
    const parsedId = Number(id);
    await this.estudianteService.delete(parsedId);
    return {
      message: 'Registro eliminado con exito',
    };
  }
}
