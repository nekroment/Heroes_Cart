import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Heroes } from 'src/schema/Heroes';
import { Model } from 'mongoose';

@Injectable()
export class HeroesService {
    constructor(@InjectModel(Heroes.name) private heroesModel: Model<Heroes>) {}
    
}
