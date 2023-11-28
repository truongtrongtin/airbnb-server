import { Request, Response, http } from '@google-cloud/functions-framework';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module.js';

let nestApp: NestFastifyApplication;
// https://cloud.google.com/functions/docs/configuring/env-var#newer_runtimes
const isOnGoogleCloud = Boolean(
  process.env.K_SERVICE && process.env.K_REVISION,
);

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  return app.init();
}

if (!isOnGoogleCloud) {
  const port = Number(process.env.PORT) || 4000;
  nestApp = await bootstrap();
  await nestApp.listen(port, '0.0.0.0');
  console.log(`Listening on ${await nestApp.getUrl()}`);
}

http('api', async (req: Request, res: Response) => {
  nestApp = nestApp ?? (await bootstrap());
  const fastifyInstance = nestApp.getHttpAdapter().getInstance();
  await fastifyInstance.ready();
  fastifyInstance.server.emit('request', req, res);
});
