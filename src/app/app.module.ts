
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { TitlePipe } from './pipes/title.pipe';
import { MovieComponent } from './movie/movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { RuntimePipe } from './pipes/runtime.pipe';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { DirectorPipe } from './pipes/director.pipe';
import { DeleteMovieComponent } from './delete-movie/delete-movie.component';
import { LimitPipe } from './pipes/limit.pipe';
import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    TitlePipe,
    MovieComponent,
    EditMovieComponent,
    RuntimePipe,
    AddMovieComponent,
    DirectorPipe,
    DeleteMovieComponent,
    LimitPipe,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    })
  ],
  providers: [MDBSpinningPreloader],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
