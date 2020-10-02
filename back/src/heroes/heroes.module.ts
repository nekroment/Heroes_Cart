import { Module } from '@nestjs/common';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Heroes, HeroesSchema } from 'src/schema/Heroes';

@Module({
  imports: [MongooseModule.forFeature([{name: Heroes.name, schema: HeroesSchema}])],
  controllers: [HeroesController],
  providers: [HeroesService]
})
export class HeroesModule {}
