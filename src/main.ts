import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { FastifyAdapter, NestFastifyApplication, } from '@nestjs/platform-fastify';
import * as helmet from 'fastify-helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { fastifySwagger } from 'fastify-swagger'
import { AllExceptionsFilter } from './shared/exceptionFilter';
import * as WebSocket from "ws";
import ZipmexManager from './manager/zipmex.manager';
import * as moment from 'moment'
import { ZipmexService } from './service/zipmex.service';
import { ticksToDate } from 'tick-time';
import { WSService } from './service/socket.service';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { logger: console });
  const configService = app.get(ConfigService);
  const PORT = configService.get('port')
  app.useGlobalFilters(new AllExceptionsFilter())
  app.register(helmet.fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  app.use(morgan('tiny'));
  await app.listen(PORT, '0.0.0.0');
  const zipmex = new ZipmexService()
  await zipmex.connectSocket()
  const productSend = zipmex.getProduct()
  const idn = zipmex.getInstruments()
  zipmex.ws.send(idn)
 

  // const options = new DocumentBuilder()
  //   .setTitle('API Specification')
  //   .setDescription('The API description')
  //   .setVersion('1.0')
  //   .addBearerAuth()
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api-doc', app, document);
  const url = await app.getUrl()
  console.log('Running on : ', url)
  console.log(ticksToDate('637532226195083118'))
}
bootstrap();
