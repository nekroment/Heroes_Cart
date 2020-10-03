import { Hero } from './../schema/Hero';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  UploadedFiles,
  Body,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Heroes } from 'src/schema/Heroes';
import { identity } from 'rxjs';
import { DeleteHeroes } from 'src/schema/DeleteHeroes';
const path = require('path');
const fs = require('fs');
const imageToBase64 = require('image-to-base64');

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Post('/')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/heroesImages',
        filename: (req, file, cb) => {
          const filename: string = path
            .parse(file.originalname)
            .name.replace(/\s/g, '');
          const extention: string = path.parse(file.originalname).ext;

          cb(null, `${filename}${extention}`);
        },
      }),
    }),
  )
  async saveHero(@UploadedFile() file, @Body() body: Heroes) {
    try {
      return this.heroesService.saveHero(`${file.filename}`, body);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/:image/image')
  async getImage(@Param('image') image, @Res() res) {
    try {
      const string = `./src/heroesImages/${image}`;
      fs.readFile(path.resolve(string), (err, data) => {
        const logo = data.toString('base64');
        res.send(logo);
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/')
  async getHeroes() {
    try {
      const heroes = await this.heroesService.getHeroes();
      return heroes;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/change')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/heroesImages',
        filename: (req, file, cb) => {
          const filename: string = path
            .parse(file.originalname)
            .name.replace(/\s/g, '');
          const extention: string = path.parse(file.originalname).ext;

          cb(null, `${filename}${extention}`);
        },
      }),
    }),
  )
  async changeHero(@UploadedFile() file, @Body() body: Hero) {
    try {
      body.image = `${file.filename}`;
      return this.heroesService.changeHero(body);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':_id/:image')
  async deleteHero(@Param() params: DeleteHeroes) {
    return await this.heroesService.deleteHero(params._id, params.image);
  }
}
