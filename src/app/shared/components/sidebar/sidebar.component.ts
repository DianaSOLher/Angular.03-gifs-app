import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private gifService: GifService){}

  get tags(): string[]{
    return this.gifService.tagHistory;
  }
  
  searchTag( tag: string){
    this.gifService.searchTag(tag);
  }

}
