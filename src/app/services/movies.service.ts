import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of, Observable} from 'rxjs';
import {Movie} from '../models/movie';
import {TitlePipe} from '../pipes/title.pipe';
import { map } from 'rxjs/operators';
import { Genre } from '../models/genre';
import { ListService } from './list.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = 'https://api.themoviedb.org/4/list/1?api_key=08eb1772b4c4c7294fa392746f93f841';
  private dataApi =  'http://www.omdbapi.com/?apikey=17899a3e';
  private movieList: Movie[];
  private movieTitles:string[];
  constructor(private httpCilent: HttpClient, private titlePipe: TitlePipe,private listService:ListService) {
    this.movieTitles = this.listService.getMovies();
    this.movieList = [];
  }

  // Sending each movie title to api. Modeling returned data before subscribing.
  setMovies() :void { 
    this.movieTitles.forEach(element => {
      this.getMovie(element).pipe(
            map(this.apiToMovieModel)
          ).subscribe(res => {
            const movie = <Movie>(res);
            this.movieList.push(movie);
          });
      });
  }
    //Ajax request to api using title
  getMovie(title): Observable<any> {
    return this.httpCilent.get(`${this.dataApi}+&t=${title}`, {responseType: 'json'});
  }
  //Modeling response from api to type Movie
  public apiToMovieModel(movieItem: any): Movie {
    const m: Movie = {};
    m.id = movieItem.imdbID;
    m.title = movieItem.Title;
    m.year = movieItem.Year;
    m.runtime = Number(movieItem.Runtime.split(' ')[0]);
    m.genres = movieItem.Genre.split(',').map(genre => new Genre(genre));
    m.director = movieItem.Director;
    m.poster = movieItem.Poster == 'N/A' || movieItem.Poster == undefined ? '../../assets/film.jpeg' : movieItem.Poster;
    return m;
  }
  //Observable to movielist array
  getMovies(): Observable<Movie[]> {
    return of(this.movieList);
  }
    // returns false if found a movie with same title and diffrent id
  titleAvailable(movie: Movie): boolean {
    movie.title = this.titlePipe.transform(movie.title);
    const possibleDuplicate = this.movieList.find((x) => x.id != movie.id && x.title === movie.title);
    if (possibleDuplicate) 
      return false;
    else 
      return true;
  }

  idExists(id:string){
    return this.movieList.find((x) => x.id == id);
  }

  //returns a promise resolves after movie is updated, 
  //rejects if movie title exits on the list
  UpdateMovie(movie: Movie): Promise<any> {
    const updated = new Promise(
      (resolve, reject) => {
        if (!this.titleAvailable(movie)){
          reject('Movie is already in the list');
          return;
        }
        const updateIndex = this.movieList.map(x => x.id).indexOf(movie.id);
        if (movie.title != this.movieList[updateIndex].title) {
          this.getMovie(movie.title).subscribe(newMovie => {
            if (newMovie) {
              this.movieList[updateIndex] = movie;                            
              // replace with sample image when movie doesn't have a poster
              this.movieList[updateIndex].poster = newMovie.Poster == 'N/A' || newMovie.Poster == undefined ? '../../assets/film.jpeg' : newMovie.Poster;
              resolve();
            }
          });
        } 
        else {
          this.movieList[updateIndex] = movie;
          resolve();
        }
      });
    return updated; 
  }

  //returns a promise resolves after movie is added, 
  //rejects if movie title exits on the list
  addMovie(movie: Movie): Promise<any> {
    const addProm = new Promise(
      (resolve, reject) => {
        if (!this.titleAvailable(movie)) {
          reject('Movie is already in the list');
          return;
        }
        this.getMovie(movie.title).subscribe(newMovie => {
          if (newMovie) {
            movie.poster = newMovie.Poster == 'N/A' || newMovie.Poster == undefined ? '../../assets/film.jpeg' : newMovie.Poster;
            this.movieList.push(movie);
            resolve();
          }
        });
      });
    return addProm;
  }
  //Remove movie from movie list
  deleteMovie(id: string):void {
    const index = this.movieList.map(x => x.id).indexOf(id);
    this.movieList.splice(index, 1);
  }

}
