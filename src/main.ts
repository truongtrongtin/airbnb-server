import { http } from '@google-cloud/functions-framework';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module.js';

let fastifyInstance;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  fastifyInstance = app.getHttpAdapter().getInstance();

  // https://github.com/fastify/fastify/issues/946#issuecomment-766319521
  fastifyInstance.removeAllContentTypeParsers();
  fastifyInstance.addContentTypeParser('*', function (request, payload, done) {
    done(null, (payload as any).body);
  });

  await fastifyInstance.ready();
}

http('api', async (req, res) => {
  if (!fastifyInstance) await bootstrap();
  fastifyInstance.server.emit('request', req, res);
});
