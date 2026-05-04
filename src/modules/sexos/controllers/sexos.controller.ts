import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SexosService } from '../services/sexos.service';

@Controller('sexos')
export class SexosController {
  constructor(private sexosService: SexosService) {}

  @Get()
  getAll() {
    return this.sexosService.getAll();
  }

  @MessagePattern({ cmd: 'get_all_sexos' })
  async getAllSexos() {
    return await this.sexosService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.sexosService.getOne(id);
  }

  @MessagePattern({ cmd: 'get_one_sexo' })
  async getOneSexo(@Payload() id: number) {
    const parsedId = Number(id);
    return await this.sexosService.getOne(parsedId);
  }
}
