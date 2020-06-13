import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('NestJS 例子')
    .setDescription('我的 NestJS 例子')
    .setVersion('1.0')
    // .addTag('cats') // 设置全局的 tag
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-doc', app, document); // 生产环境下注释掉此行

  await app.listen(3000);
}
bootstrap();
