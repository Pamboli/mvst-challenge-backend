import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { CoffeeModule } from './coffee/coffee.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), CoffeeModule, PrismaModule],
  controllers: [AppController],
})
export class AppModule {}
