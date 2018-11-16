import { Controller, FileInterceptor, Get, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { diskStorage } from 'multer';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';
import * as sharp from 'sharp';

@Controller('photo')
export class PhotoController {

  constructor(private photoService: PhotoService) {
  }

  @Get()
  findAll(@Req() req): Observable<any[]> {
    return of([1, 2, 9, 4, 5, 6]);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/images',
      filename: (req, file, cb) => {
        const fileName = `${new Date().getTime().toString()}_${file.originalname}`;
        cb(null, `${fileName}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      cb(null, ALLOWED_TYPES.indexOf(file.mimetype) > -1);
    },
  }))
  @Param('title')
  uploadFile(@UploadedFile() file, @Req() req) {

    const photo = new Photo();
    photo.name = req.body.title;
    photo.description = '';
    photo.filename = file.filename;
    photo.views = 0;
    photo.isPublished = true;

    sharp('./uploads/images/' + file.filename)
      .resize(10, 10)
      .blur(20)
      .toBuffer((err, data) => {
        photo.previewImage = data.toString('base64');
        this.photoService.savePhoto(photo);
      });

    sharp('./uploads/images/' + file.filename)
      .resize(150, 150)
      .toFile('./uploads/images/min/' + file.filename);
  }
}

const ALLOWED_TYPES = [
  'image/jpg',
  'image/jpeg',
];
