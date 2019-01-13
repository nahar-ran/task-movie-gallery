import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {  
  private movieTitles = ['the matrix', 'birdman or the unexpected virtue of ignorance', 'the avengers', 'shutter island', 'back to the future','taxi driver'];
  private genres = [];
  
  constructor(private httpClient: HttpClient) { }

  getGenres(): Observable<any> {
    return this.httpClient.get('https://api.themoviedb.org/3/genre/movie/list?api_key=08eb1772b4c4c7294fa392746f93f841&language=en-US');
  }
  getMovies():string[] {
      return this.movieTitles;
  }
}
