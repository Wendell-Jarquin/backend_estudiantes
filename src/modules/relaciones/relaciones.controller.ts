import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RelacionesService } from './relaciones.service';
import { CreateRelacioneDto } from './dto/create-relacione.dto';
import { UpdateRelacioneDto } from './dto/update-relacione.dto';

@Controller('relaciones')
export class RelacionesController {
  constructor(private readonly relacionesService: RelacionesService) {}

  @Post()
  create(@Body() createRelacioneDto: CreateRelacioneDto) {
    return this.relacionesService.create(createRelacioneDto);
  }

  @Get()
  findAll() {
    return this.relacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRelacioneDto: UpdateRelacioneDto) {
    return this.relacionesService.update(+id, updateRelacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relacionesService.remove(+id);
  }
}
