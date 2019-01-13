import { Injectable } from '@angular/core';
import { Movie } from '../models/shared-model-index';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {MoviesService} from '../services/movies.service'

@Injectable({
  providedIn: 'root'
})
export class MovieFormService {

  constructor(private fb: FormBuilder,private movieService:MoviesService) { }
  
  //reutrns an instanse of FormGroup with control values init based on input movie
  createEditForm(mov?: Movie): FormGroup {
   return this.fb.group({
      id: [mov.id],
      poster: [mov.poster || ''],
      title: [mov.title || '' , [Validators.required]],
      year: [mov.year || '', [Validators.required, Validators, this.validYear,Validators.pattern('^[0-9]*$')]],
      runtime: [mov.runtime, [Validators.required, Validators.pattern('^[0-9]*$')]],
      genres: this.fb.array(mov.genres || []),
      director: [mov.director || '', Validators.required],
    });
  }
  
  //reutrns an instanse of FormGroup with new genarated id
  createAddForm() {
    return this.fb.group({
      id: [this.genarateId()],
      poster: [''],
      title: ['' , [Validators.required]],
      year: [ '', [Validators.required, Validators, this.validYear, Validators.pattern('^[0-9]*$')]],
      runtime: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      genres: this.fb.array([]),
      director: ['', Validators.required],
    });
  }

  //generate a random 10 char id string
  genarateId() {
    let id = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    if(!this.movieService.idExists(id))
      return id;
    else 
      return this.genarateId();
  }
    // valid year validator function
  validYear(control: FormControl): null | {'range': boolean} {
    return control.value > 1888 && control.value < 2020 ? null : {range: true};
  }
}
