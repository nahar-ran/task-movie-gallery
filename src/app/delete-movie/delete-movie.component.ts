import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import{ MoviesService} from '../services/movies.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { Movie } from '../models/movie';

@Component({
  selector: 'delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.scss']
})
export class DeleteMovieComponent implements OnInit {

  public _movie: Movie;
  @Output() onHide : EventEmitter<string>;
  @ViewChild('delete') delete: ModalDirective;
  
  constructor(private movieService: MoviesService) {
    this.onHide = new EventEmitter();
  }
  ngOnInit() { }

  @Input() set movie(movie: Movie) { // Using an input var setter as a hook to init component with new data
    this._movie = movie;
    if (this._movie && this._movie.title) {
      this.show();
    }
  }
  show() { // Activate modal, subscribing to hide event
    this.delete.show();
    this.delete.onHide.subscribe(() => {
      this.onHide.emit(); // Emits the onhide event back up to movie-list component
    });
  }
  deleteMovie(){
    this.delete.hide();
    this.movieService.deleteMovie(this._movie.id);
  }
}
