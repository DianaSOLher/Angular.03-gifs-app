import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';

@Component({
    selector: 'gifs-search-box',
    template: `
        <h5>Buscar: </h5>
        <input type="text"
          class="form-control"
          placeholder="Buscar gifs..."
          (keyup.enter)="searchTag()"
          #txtTagInput
          >
    `
})

export class SearchBoxComponent {
    @ViewChild('txtTagInput')
    public tagInput!: ElementRef<HTMLInputElement>;//!: NOT NULL OPERATOR  
    constructor( private gifService: GifService) { }

    // searchTag( newTag:string){
    //     console.log({newTag})
    // }

    searchTag(){
        const newTag = this.tagInput.nativeElement.value;
        this.gifService.searchTag(newTag);
        this.tagInput.nativeElement.value= '';
    }

}