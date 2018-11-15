import { Module, MulterModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { Photo } from './photo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
    MulterModule.register({
      dest: 'uploads/images',
    }),
  ],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {
}