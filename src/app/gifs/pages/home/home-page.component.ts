import { Component } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { Gif } from 'src/app/gifs/interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  constructor( private gifsService: GifService){}
  get gifs(): Gif[]{
    return this.gifsService.gifList;
  }
}
