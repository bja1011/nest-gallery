import { Controller, Get, Req } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Controller('photo')
export class PhotoController {

  @Get()
  findAll(@Req() req): Observable<any[]> {
    return of([1, 2, 9, 4, 5, 6]);
  }
}
