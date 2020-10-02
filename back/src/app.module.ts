import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroesModule } from './heroes/heroes.module';
require('dotenv/config');

const connectionString = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.zkmbj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

@Module({
  imports: [
    MongooseModule.forRoot(connectionString),
    HeroesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
