import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public curLatitude: any;
  public curLongitude: any;
  public restaurantDetails: any;
  public cityEnteredByUser: string = '';
  public suggestedLocations: Array<any> = [];

  // asyncResult:any;

  constructor(private appService: AppService) {

  }
  ngOnInit() {
    console.log('afterviewinit', navigator.geolocation);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('afterviewinit', position);
        this.getRestaurantDetails(position.coords.latitude, position.coords.longitude);
      });
    } else
      alert("Geolocation is not supported by this browser.");
  }

  public nearbyRestaurants: Array<any> = [];

  ngAfterViewInit() {

    var modal = document.getElementById('myModal');
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

  }

  public openModal(restro) {
    var modal = document.getElementById('myModal');
    modal.style.display = "block";

    this.appService.getRestaurantDetails(restro['restaurant']['R']['res_id'])
      .subscribe((restaurantDetails: any) => {
        console.log(restaurantDetails);
        this.restaurantDetails = restaurantDetails;

        //       this.appService.getRestaurantDailyMenu(restro['restaurant']['R']['res_id'])
        //       .subscribe((restaurantDailyMenu: any) => {
        //         console.log(restaurantDailyMenu);
        // // this.restaurantDetails=restaurantDetails;
        //       });      
        this.appService.getRestaurantUserReviews(restro['restaurant']['R']['res_id'])
          .subscribe((restaurantUserReviews: any) => {
            this.restaurantDetails['userReviews'] = restaurantUserReviews['user_reviews'];
            console.log(restaurantUserReviews);
          });
      });

  }

  public closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
  }

  public search(event) {
    if (event.keyCode == 13) {
      this.appService.getLongitudeLatitudePosition(this.cityEnteredByUser)
        .subscribe((resultPosition: any) => {
          console.log(resultPosition);
          if (resultPosition['status'] == "success") {
            this.suggestedLocations = resultPosition['location_suggestions'];
            if (this.suggestedLocations.length == 1) {
              this.getRestaurantDetails(this.suggestedLocations[0]['latitude'], this.suggestedLocations[0]['longitude']);
            }
          }
        });
    }
  }

  private getRestaurantDetails(latitude: any, longitude: any) {
    this.appService.getLocationWiseRestaurantsDetails(latitude, longitude).subscribe((result: any) => {
      this.nearbyRestaurants = result['nearby_restaurants'];
      console.log(this.nearbyRestaurants);
      console.log(typeof this.nearbyRestaurants);
    });
  }

}
