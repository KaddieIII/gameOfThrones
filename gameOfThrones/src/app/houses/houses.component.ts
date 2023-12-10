import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss']
})
export class HousesComponent implements OnInit {
  loading = true;
  houses: any;
  searchText: string = '';
  
  constructor(private api: ApiService) {}
  
  ngOnInit(): void {
    this.getHouses();
  }

  getHouses() {
    this.loading = true;
    this.api.get('v1/houses').subscribe((response) => {
      this.loading = false;
      this.houses = response;
      console.log('houses: ', this.houses);
    });
  }

  toggleHouse(house: any) {
    if (!house.expanded) {
      this.houses.forEach((_house: any) => {
        _house.expanded = false;
      });
    }
    house.expanded = !house.expanded;
  }
}
