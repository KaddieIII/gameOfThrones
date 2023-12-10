import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss']
})
export class HousesComponent implements OnInit {
  loading = true;
  houses: any;
  house: any;
  name: string = '';
  searchText: string = '';
  
  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private router: Router) {}
  
  ngOnInit(): void {
    this.getHouses();
  }

  navigate(name: string) {
    this.router.navigate(['/persons'], {
      queryParams: { person: name },
    });
  }

  scrollIntoView() {
    let index = this.houses.findIndex((house: any) => house.name === this.name);
    this.house = this.houses[index];
    setTimeout(() => {
      const entryToScrollTo = document.getElementById(this.name);
      if (entryToScrollTo) {
        entryToScrollTo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
    
    this.toggleHouse(this.house);
  }

  getHouses() {
    this.loading = true;
    this.api.get('v1/houses').subscribe((response) => {
      this.loading = false;
      this.houses = response;
      this.name = this.route.snapshot.queryParams['house'];
      if(this.name) {
        this.scrollIntoView();
      }
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
