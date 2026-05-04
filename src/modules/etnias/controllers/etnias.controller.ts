import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EtniasService } from '../services/etnias.service';

@Controller('etnias')
export class EtniasController {
  constructor(private etniasService: EtniasService) {}

  @Get()
  getAll() {
    return this.etniasService.getAll();
  }

  @MessagePattern({ cmd: 'get_all_etnias' })
  async getAllEtnias() {
    return await this.etniasService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.etniasService.getOne(id);
  }

  @MessagePattern({ cmd: 'get_one_etnia' })
  async getOneEtnia(@Payload() id: number) {
    const parsedId = Number(id);
    return await this.etniasService.getOne(parsedId);
  }
}
