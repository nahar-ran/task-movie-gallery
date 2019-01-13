import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Movie, Genre } from '../models/shared-model-index';
import {ListService} from '../services/list.service';
import {FormGroup, FormBuilder} from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import {MoviesService} from '../services/movies.service';
import { map } from 'rxjs/operators';
import { MovieFormService } from '../services/movie-form.service';

@Component({
  selector: 'add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  public movieNotFound: boolean;
  addForm: FormGroup;
  private _showAddModal: boolean;
  private genreMessage: boolean;
  public submitted:boolean;
  genreList: any[];
  public _movie: Movie;
  @ViewChild('frame') frame: ModalDirective;
  @Output() onHide : EventEmitter<void>;

  constructor(private listService: ListService, private moviesService: MoviesService, private formService: MovieFormService) {
    this.genreMessage = false;
    this.genreList = [];
    this.onHide = new EventEmitter();
  }

  ngOnInit() { }

  @Input() set showAddModal(showAddModal: boolean){ // Using an input var setter as a hook to init component
    if (showAddModal) {
      this.submitted =false;
      this._showAddModal = showAddModal;
      this.initComp();
    }
  }

  initComp(){  //Initialize component
    this.genreMessage = false;
    this.listService.getGenres().subscribe(res => {
      res.genres.forEach(x => {
        this.genreList.push({value: x.name, label: x.name}); }); 
        /* Modeling the genre this way is necessary 
        for the mdb-select element to present the options*/
        this.createForm();
        });
    this.show();
  }
  createForm(){ //Builds form using movie form service
    this.addForm = this.formService.createAddForm();
    setTimeout(() => this.addForm.controls.genres.setErrors({length: 'true'})); 
    // Genres FormArray error is initialized due to the array being empty 
  }
  show(){ // Activate modal
   this.frame.show();
   this.frame.onHide.subscribe(() => {
      this.addForm = null;
      this.onHide.emit();
   });
  }
  addGenre(genreEl){// Add genre to genres FormArray
    this.addForm.controls.genres.setErrors(null);
    let genreExists = this.addForm.controls.genres.value.map((x) => x.name).indexOf(genreEl.value);
    if (genreExists === -1) {this.addForm.controls.genres.value.push(new Genre(genreEl.value.trim()));
      this.genreMessage = false; } else { this.genreMessage = true; }
  }
  removeGenre() { // Remove genre from genres FormArray
    if (this.addForm.controls.genres.value.length == 1) {
      this.addForm.controls.genres.setErrors({length: 'true'});
    }
    this.addForm.controls.genres.value.pop();
  }
  getGenres(genresArray: Genre[]) { // Returns a string of genres, made use by DOM for display current genres
    return genresArray.map(g => g.name).join(', ');
  }
  submitForm(){ // Add form submit when user click save
    if (!this.addForm.valid)
      return;
    else{
      this.submitted = true;
      let movie: Movie;
      movie = <Movie>this.addForm.value;
      this.moviesService.addMovie(movie).then((res) => {
          this.frame.hide();
        }, 
        (err) => {
          this.addForm.controls.title.setErrors({unAvailable: true}); //title unavailable
          this.submitted = false;
        });
    }    
  }
  // Fetch new movie details from api and spread new data to form.
  /* pipe is used to prevent current 
    genarated id of being replaced by the imdb id comming from api*/
  getDetails(){   
    this.moviesService.getMovie(this.addForm.controls.title.value).pipe(map((res)=>  
      {res.imdbID = this.addForm.controls.id.value;return res})).subscribe(mov => {
      if (mov.Response == 'False')
        this.movieNotFound = true;
      else{
        this.movieNotFound = false;
        this.addForm = this.formService.createEditForm(this.moviesService.apiToMovieModel(mov));
      }
    });
  }
}
