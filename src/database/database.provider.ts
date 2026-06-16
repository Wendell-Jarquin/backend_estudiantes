import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    autoLoadEntities: configService.get('AUTOLOADENTITIES') === 'true',
    synchronize: false,
  }),
});
