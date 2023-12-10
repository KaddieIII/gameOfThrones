import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(private api: ApiService,
              private router: Router) {}
  
  ngOnInit(): void {
    this.getHouses();
  }

  navigate(name: string) {
    this.router.navigate(['/persons'], {
      queryParams: { person: name },
    });
  }

  getHouses() {
    this.loading = true;
    this.api.get('v1/houses').subscribe((response) => {
      this.loading = false;
      this.houses = response;
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
