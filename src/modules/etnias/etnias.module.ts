import { Module } from '@nestjs/common';
import { EtniasController } from './controllers/etnias.controller';
import { EtniasService } from './services/etnias.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etnia } from './entities/etnia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Etnia])],
  controllers: [EtniasController],
  providers: [EtniasService],
  exports: [],
})
export class EtniasModule {}
