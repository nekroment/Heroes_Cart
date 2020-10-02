import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Heroes } from 'src/schema/Heroes';
import { Model } from 'mongoose';
const fs = require('fs')

@Injectable()
export class HeroesService {
    constructor(@InjectModel(Heroes.name) private heroesModel: Model<Heroes>) {}

    async saveHero(image: string, hero: Heroes) {
        let newHeroes = new this.heroesModel({
            nickname: hero.nickname,
            real_name: hero.real_name,
            origin_description: hero.origin_description,
            catch_phrase: hero.catch_phrase,
            image
        });
        return newHeroes.save();
    }

    async getHeroes() {
        return await this.heroesModel.find();
    }

    async changeHero(hero: Heroes) {
        const oldHero = await this.heroesModel.findOne({_id: hero._id});

        if(hero.image !== oldHero.image) {
            fs.unlinkSync(`./src/heroesImages/${oldHero.image}`);
        }
        return await this.heroesModel.updateOne({_id: hero._id}, {
            nickname: hero.nickname,
            real_name: hero.real_name,
            origin_description: hero.origin_description,
            catch_phrase: hero.catch_phrase,
            image: hero.image
        })
    }

    async deleteHero(_id: string, image: string) {
        const isHero = await this.heroesModel.findOne({_id: _id});
        if(isHero) {
            fs.unlinkSync(`./src/heroesImages/${image}`);
            return await this.heroesModel.deleteOne({_id: _id});
        }
    }
}
