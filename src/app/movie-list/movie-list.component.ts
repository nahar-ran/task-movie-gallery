import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {Movie} from '../models/movie';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  
  public movies: Movie[];
  
  //modal inputs, when being set the diffrent modal components activated
  public editMovie: Movie;
  public deleteMovie: Movie;
  public showAddModal :Boolean;
  
 
  public deleteId :string 

  constructor(private moviesService: MoviesService) {
    this.movies = [];
    this.showAddModal = false;
    this.deleteId = ''
  }

  ngOnInit(){
    this.moviesService.setMovies();
    this.moviesService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
  }
  
  /* 
       Diffrent modal opening/closing functions
  */
  showEdit(movie) {
    this.editMovie = movie;
  }
  showDelete(movie) {
    this.deleteMovie = movie;
  }
  hideEdit() {
    this.editMovie = null;
  }
  hideDelete() {
    this.deleteMovie = null;
  }
  showAdd() {
    this.showAddModal = true;
  }
  hideAdd() {
    this.showAddModal = false;
  }
  
}
