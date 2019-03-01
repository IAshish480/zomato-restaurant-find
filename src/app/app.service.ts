import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'user-key': 'bc1474870651eafe0d4b5c7a7eca96c3'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor(private http: HttpClient) { }
  private api_url = "https://developers.zomato.com/api/v2.1";

  public getLocationWiseRestaurantsDetails(latitude: any, longitude: any) {
    let url: string = this.api_url + '/geocode?lat=' + latitude + '&lon=' + longitude;

    return this.http.get<any>(url, httpOptions).pipe(tap((result: any) => { }),
      catchError(this.handleError('locationWiseRestaurantsDetails', {})));
  }
 
  public getLongitudeLatitudePosition(city: string) {
    let url: string = this.api_url + '/locations?query=' + city;

    return this.http.get<any>(url, httpOptions).pipe(tap((result: any) => { }),
      catchError(this.handleError('LongitudeLatitudePosition', {})));
  }

  public getRestaurantDetails(res_id: string) {
    let url: string = this.api_url + '/restaurant?res_id=' + res_id;

    return this.http.get<any>(url, httpOptions).pipe(tap((result: any) => { }),
      catchError(this.handleError('RestaurantDetails', {})));
  }
  public getRestaurantDailyMenu(res_id: string) {
    let url: string = this.api_url + '/dailymenu?res_id=' + res_id;

    return this.http.get<any>(url, httpOptions).pipe(tap((result: any) => { }),
      catchError(this.handleError('RestaurantDailyMenu', {})));
  }
  public getRestaurantUserReviews(res_id: string) {
    let url: string = this.api_url + '/reviews?res_id=' + res_id;

    return this.http.get<any>(url, httpOptions).pipe(tap((result: any) => { }),
      catchError(this.handleError('RestaurantUserReviews', {})));
  }

  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {

      let finalResult = { error: error.message, modelObject: null };

      // Let the app keep running by returning an empty result.
      return of(finalResult as any);
    };
  }


}
