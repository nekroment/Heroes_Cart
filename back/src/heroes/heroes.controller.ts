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
const path = require('path');

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
  async saveHero(
    @UploadedFile() file,
    @Body() body: Heroes,
  ) {
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
      res.sendFile(image, { root: './src/heroesImages' });
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
      return await this.heroesService.getHeroes();
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
  async changeHero(
    @UploadedFile() file,
    @Body() body: Heroes,
  ) {
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
  async deleteHero(@Param() params: Heroes) {
      return await this.heroesService.deleteHero(params._id, params.image);
  }
}
