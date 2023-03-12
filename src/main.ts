import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const PORT = process.env.PORT || 4001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(`🚀 App running on http://localhost:${PORT}`);
}
bootstrap();
