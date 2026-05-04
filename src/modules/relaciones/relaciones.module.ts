import { Module } from '@nestjs/common';
import { RelacionesService } from './relaciones.service';
import { RelacionesController } from './relaciones.controller';

@Module({
  controllers: [RelacionesController],
  providers: [RelacionesService],
})
export class RelacionesModule {}
