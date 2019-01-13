import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Movie} from '../models/movie';
import{MoviesService} from '../services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  private _movie: Movie;
  public genres: string;
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();
  
  @Input() set movie(movie: Movie) {
    this._movie = movie;
    this.genres = this._movie.genres.map(x => x.name).join(', ');
  }
  constructor(private movieService: MoviesService) { }

  ngOnInit() { }

  editMovie(id) {
    this.editEvent.emit(id);
  }
  deleteMovie(id) {
      this.deleteEvent.emit(id);
  }
}
