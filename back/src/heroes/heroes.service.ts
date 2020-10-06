import { Hero } from './../schema/Hero';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Heroes } from 'src/schema/Heroes';
import { Model } from 'mongoose';
const fs = require('fs');
const path = require('path');

@Injectable()
export class HeroesService {
  constructor(@InjectModel(Heroes.name) private heroesModel: Model<Heroes>) {}

  async saveHero(image: string[], hero: Heroes) {
    let newHeroes = new this.heroesModel({
      nickname: hero.nickname,
      real_name: hero.real_name,
      origin_description: hero.origin_description,
      catch_phrase: hero.catch_phrase,
      image,
    });
    return newHeroes.save();
  }

  async getCount() {
    return await this.heroesModel.count();
  }

  async getHeroes() {
    return await this.heroesModel.find();
  }

  async getHeroesLimit(skip: number, limit: number) {
    return await this.heroesModel
      .find()
      .skip(Number(skip))
      .limit(Number(limit));
  }

  async changeHero(hero: Hero) {
    const oldHero = await this.heroesModel.findOne({ _id: hero._id });
    for (let i = 0; i < hero.delete_image.length; i++) {
      if (path.basename(`./src/heroesImages/${hero.delete_image[i]}`)) {
        fs.unlinkSync(`./src/heroesImages/${hero.delete_image[i]}`);
      }
    }
    return await this.heroesModel.updateOne(
      { _id: hero._id },
      {
        nickname: hero.nickname,
        real_name: hero.real_name,
        origin_description: hero.origin_description,
        catch_phrase: hero.catch_phrase,
        image: hero.image,
      },
    );
  }

  async deleteHero(_id: string) {
    const isHero = await this.heroesModel.findOne({ _id: _id });
    const images: string[] = isHero.image;
    if (isHero) {
      for (let i = 0; i < images.length; i++) {
        fs.unlinkSync(`./src/heroesImages/${images[i]}`);
      }
      return await this.heroesModel.deleteOne({ _id: _id });
    }
  }
}
