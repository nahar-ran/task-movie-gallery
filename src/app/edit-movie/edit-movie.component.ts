import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Movie, Genre } from '../models/shared-model-index';
import {ListService} from '../services/list.service';
import {FormGroup} from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import {MoviesService} from '../services/movies.service';
import { MovieFormService } from '../services/movie-form.service';

@Component({
  selector: 'edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  public showErr:boolean
  public genreMessage:boolean;
  editForm: FormGroup;
  genreList: any[]; 
  public _movie: Movie;
  @ViewChild('frame') frame: ModalDirective; 
  @Output() onHide : EventEmitter<void>;

  constructor(private listService: ListService, private moviesService: MoviesService, private formService:MovieFormService) { 
    this.genreList = [];
    this.onHide = new EventEmitter();
    this.showErr = false;
    this.genreMessage = false;
  }
  @Input() set movie(movie: Movie) { // Using an input var setter as a hook to init component with new data
    if(movie){
      this._movie = movie;
      this.initComp();}
    }

  ngOnInit() { }

  initComp(){ //Initialize component
    this.genreMessage = false;
    this.listService.getGenres().subscribe(res => {
      res.genres.forEach(x => {
        this.genreList.push({value: x.name, label: x.name});
        /* Modeling the genre this way is necessary 
        for the mdb-select element to present the options*/
      });
      this.createForm();
      this.show();
    });
  }

  createForm() { // Builds form using movie form service
    this.editForm = this.formService.createEditForm(this._movie);
  }
  show() { // Activate modal, subscribing to hide event
    this.frame.show();
    this.frame.onHide.subscribe(() => {
      this.onHide.emit(); // Emits the onhide event back up to movie-list component
    });
  }
  
  getGenres(genresArray: Genre[]) { // Returns a string of genres, made use for display current genres
    return genresArray.map(g => g.name).join(', ');
  }

  addGenre(genreEl) { // Add genre to genres FormArray
    this.editForm.controls.genres.setErrors(null);
    const genreExists = this.editForm.controls.genres.value.map((x) => x.name).indexOf(genreEl.value);
    if (genreExists === -1) {
      this.editForm.controls.genres.value.push(new Genre(genreEl.value.trim()));
      this.genreMessage = false;
    } 
    else
       this.genreMessage = true; 
  }

  removeGenre(){  // Remove genre from genres FormArray
    if (this.editForm.controls.genres.value.length == 1) {
      this.editForm.controls.genres.setErrors({length: 'true'});
    }
    this.editForm.controls.genres.value.pop();
  }

  submitForm(){
    let updatedMovie: Movie;
    updatedMovie = this.editForm.value;
    if (!this.editForm.valid) 
      return; 
    else{ 
      this.moviesService.UpdateMovie(updatedMovie).then(
        (obj) => {
          this.frame.hide();
        }, 
        (err) => {
          this.editForm.controls.title.setErrors({unAvailable: true}); //title unavailable
      });
    }
  }
}
