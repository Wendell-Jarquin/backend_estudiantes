import { Module } from '@nestjs/common';
import { SexosController } from './controllers/sexos.controller';
import { SexosService } from './services/sexos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sexo } from './entities/sexo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sexo])],
  controllers: [SexosController],
  providers: [SexosService],
  exports: [],
})
export class SexosModule {}
