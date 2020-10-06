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
  Put,
} from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Heroes } from 'src/schema/Heroes';
import { identity } from 'rxjs';
import { DeleteHeroes } from 'src/schema/DeleteHeroes';
import { Limit } from 'src/schema/Limit';
const path = require('path');
const fs = require('fs');
const imageToBase64 = require('image-to-base64');

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Post('/')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
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
  async saveHero(@UploadedFiles() files, @Body() body: Heroes) {
    try {
      const allFiles: string[] = [];
      console.log(files)
      for (let i = 0; i < files.length; i++) {
        allFiles.push(files[i].filename);
      }
      return this.heroesService.saveHero(allFiles, body);
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

  @Get('/count')
  async getCount() {
    try {
      return await this.heroesService.getCount();
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

  @Get('/limit/:skip/:limit')
  async getHeroesLimit(@Param() params: Limit) {
    try {
      const heroes = await this.heroesService.getHeroesLimit(params.skip, params.limit);
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

  @Put('/change')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
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
  async changeHero(@UploadedFiles() files, @Body() body: Hero) {
    try {
      body.image = [];
      body.delete_image = String(body.delete_image).split(',');
      body.save_image = String(body.save_image).split(',');
      for(let i = 0; i < body.save_image.length; i++) {
        if(body.delete_image.findIndex((item) => item === body.save_image[i]) >= 0) {

        } else {
          body.image.push(body.save_image[i]);
        }
        
      }
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

  @Delete('/:_id')
  async deleteHero(@Param() params: DeleteHeroes) {
    return await this.heroesService.deleteHero(params._id);
  }
}
