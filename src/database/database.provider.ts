import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Estudiante } from '../modules/estudiantes/entities/estudiante.entity';
import { Sexo } from '../modules/sexos/entities/sexo.entity';
import { Etnia } from '../modules/etnias/entities/etnia.entity';

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('HOST'),
    port: +configService.get('PORT_DB'),
    username: configService.get('USERNAME_DB'),
    password: configService.get('PASSWORD_DB'),
    database: configService.get('DATABASE'),
    entities: [Estudiante, Sexo, Etnia],
    synchronize: false,
  }),
});
