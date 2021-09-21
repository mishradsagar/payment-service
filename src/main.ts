/* eslint-disable import/no-unresolved */
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import AppModule from './app.module'

async function bootstrap () {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn']
  })
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Payment APIs')
    .setDescription('APIs for Payment Information')
    .setVersion('1.0')
    .addTag('payments')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(process.env.PORT)
}
bootstrap()
