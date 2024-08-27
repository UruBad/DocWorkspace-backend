import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { config, enviroments } from './configs';
import * as modules from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true, //when true, stops validation on the first error, otherwise returns all the errors found. Defaults to true.
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: 'mysql',
          host: configService.database.host,
          port: configService.database.port,
          database: configService.database.name,
          username: configService.database.user,
          password: configService.database.password,
          autoLoadEntities: true,
          keepConnectionAlive: true,
          synchronize: false,
          migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
          seeds: [__dirname + '/database/seeds/**/*{.ts,.js}'],
          factories: [__dirname + '/database/factories/**/*{.ts,.js}'],
          cli: {
            migrationsDir: __dirname + '/database/migrations/',
          },
        };
      },
    }),
    modules.AuthModule,
    modules.UsersModule,
    modules.VitaminsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
