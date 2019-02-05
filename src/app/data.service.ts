import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCoordinates(city: string) {

    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyCL3dFrUE4EuCXd_-DTrk3yGlqNmqm4Frk`)
    .pipe (
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return Observable.throw(err);
    })
    );
  }

  getFilteredData(result) {
      return this.http.post('http://demo3248943.mockable.io/search', result);

  }
}
