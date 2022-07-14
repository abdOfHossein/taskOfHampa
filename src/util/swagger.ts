import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Task Of Hampa')
    .setDescription('Login Register and Crud With Nest.js and Postgresql')
    .addTag('user')
    .addTag('loginAndRegisterUser')
    .addBearerAuth(
      // {
      //   type: 'http',
      //   scheme: 'bearer',
      //   bearerFormat: 'Token',
      // },
      // 'access_token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);
}
