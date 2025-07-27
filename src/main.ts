import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API TODO')
    .setDescription('Documentação da API do backend do todo')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Cole seu token JWT aqui (depois de fazer login)',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();


  const document = SwaggerModule.createDocument(app,config)


  SwaggerModule.setup('api-docs',app,document)


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
