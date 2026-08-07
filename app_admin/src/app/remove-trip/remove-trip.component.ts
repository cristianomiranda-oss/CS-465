import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-remove-trip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './remove-trip.component.html',
  styleUrl: './remove-trip.component.css',
})
export class RemoveTripComponent implements OnInit {
  trip!: Trip;
  message: string = '';

  constructor(
    private router: Router,
    private tripDataService: TripDataService,
  ) {}

  ngOnInit(): void {
    // Retrieve stashed trip ID
    let tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent::ngOnInit');
    console.log('tripcode:' + tripCode);

    // Uses placeholder data when first loading
    this.trip = {
      _id: '',
      code: '',
      name: '',
      length: '',
      start: new Date(),
      resort: '',
      perPerson: '',
      image: '',
      description: '',
    };

    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: any) => {
        // Sets the first returned value to the trip attribute
        this.trip = value[0];

        if (!value) {
          this.message = 'No Trip Retrieved!';
        } else {
          this.message = 'Trip: ' + tripCode + ' retrieved';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      },
    });
  }

  public removeTrip(trip: Trip) {
    this.tripDataService.deleteTrip(trip.code).subscribe({
      next: (value: any) => {
        console.log(value);
        this.router.navigate(['']);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      },
    });
  }

  public returnHome() {
    this.router.navigate(['']);
  }
}
