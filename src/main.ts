import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Main');
  //trasformamos a microservicio
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      //ahora ocupamos el transportador de nats
      transport: Transport.NATS,
      options: {
        //ahora ocupamos el servidor de nats
        servers: envs.natsServers,
      },
    },
  );
  //para que funcione el pipe de validacion junto a class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen();
  logger.log(`Products Microservice running on port ${envs.port}`);
}
bootstrap();
