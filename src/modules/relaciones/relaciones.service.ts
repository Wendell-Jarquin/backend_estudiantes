import { Injectable } from '@nestjs/common';
import { CreateRelacioneDto } from './dto/create-relacione.dto';
import { UpdateRelacioneDto } from './dto/update-relacione.dto';

@Injectable()
export class RelacionesService {
  create(createRelacioneDto: CreateRelacioneDto) {
    return 'This action adds a new relacione';
  }

  findAll() {
    return `This action returns all relaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} relacione`;
  }

  update(id: number, updateRelacioneDto: UpdateRelacioneDto) {
    return `This action updates a #${id} relacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} relacione`;
  }
}
