import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifService {
    public gifList: Gif[]=[];

    private _tagsHistory: string[] = [];
    //GIPHY APIKEY
    private apiKey:     string = 'LJK1Tv5zfKk9soJrwJeUgJYwV7IEoW9e';
    private serviceURL: string = 'http://api.giphy.com/v1/gifs';

    constructor(private http: HttpClient) {
        this.loadLocalStorage();
        console.log('Gifs Service Ready')
     }
    
    get tagHistory(){
        return[...this._tagsHistory]
    }

    private organizeHistory(tag:string){
        tag = tag.toLowerCase();
        if(this._tagsHistory.includes(tag)){
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
        }
        this._tagsHistory.unshift(tag);
        this._tagsHistory = this.tagHistory.splice(0,10);
        this.savLocalStorage();
    }

    private savLocalStorage():void{
        localStorage.setItem('history', JSON.stringify(this._tagsHistory ))
    }

    private loadLocalStorage():void{
        if( !localStorage.getItem('history') ) return;
        this._tagsHistory = JSON.parse(localStorage.getItem('history')! );
        if (this._tagsHistory.length == 0) return;
        this.searchTag(this._tagsHistory[0]);
    }

    searchTag(tag: string):void{
        if(tag.length === 0) return;
        this.organizeHistory(tag);
        // fetch('http://api.giphy.com/v1/gifs/search?api_key=LJK1Tv5zfKk9soJrwJeUgJYwV7IEoW9e&q=valorant&limit=10')
        //     .then( resp => resp.json())
        //     .then( data => console.log(data));
        // this._tagsHistory.unshift(tag);
        // console.log(this.tagHistory);

        const params = new HttpParams()
            .set('api_key',this.apiKey)
            .set('limit', '10')
            .set('q', tag);

        this.http.get<SearchResponse>(`${ this.serviceURL }/search`,{params})
        .subscribe(resp => {

            this.gifList = resp.data;  
            // console.log({gifs: this.gifList });

        })
    }
}