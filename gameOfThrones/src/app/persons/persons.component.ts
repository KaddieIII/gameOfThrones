import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit, OnDestroy {
  loading = true;
  persons: any;
  person: any;
  name: any;
  quote: string = '';
  searchText: string = '';
  private subscription: Subscription = new Subscription();
  
  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private router: Router) {}
  
  ngOnInit(): void {
    this.getPersons();

    this.subscription = interval(10000).subscribe(() => {
      this.nextQuote();
    });
  }

  getPersons() {
    this.loading = true;
    this.api.get('v1/characters').subscribe((response) => {
      this.loading = false;
      this.persons = response;
      this.name = this.route.snapshot.queryParams['person']
      if(this.name) {
        this.scrollIntoView();
      }   
    });
  }

  scrollIntoView() {
    let index = this.persons.findIndex((person: any) => person.name === this.name);
    this.person = this.persons[index];
    setTimeout(() => {
      const entryToScrollTo = document.getElementById(this.name);
      console.log('entryToScrollTo: ', entryToScrollTo);
      if (entryToScrollTo) {
        entryToScrollTo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
    
    this.togglePerson(this.person);
  }

  togglePerson(person: any) {
    if (!person.expanded) {
      this.persons.forEach((_person: any) => {
        _person.expanded = false;
      });
      this.person = person;
      this.randomQuote();
    } else {
      this.person = null;
      this.quote = '';
    }
    person.expanded = !person.expanded;
  }

  navigate(name: string) {
    this.router.navigate(['/houses'], {
      queryParams: { house: name },
    });
  }

  randomQuote() {
    if (this.person) {
      const randomIndex = Math.floor(Math.random() * this.person.quotes.length);
      this.quote = this.person.quotes[randomIndex];
    }
  }

  nextQuote() {
    let index = this.person.quotes.indexOf(this.quote);
    this.quote = this.person.quotes[index === this.person.quotes.length - 1 ? 0 : index + 1];
  }

  prevQuote() {
    let index = this.person.quotes.indexOf(this.quote);
    this.quote = this.person.quotes[index === 0 ? this.person.quotes.length - 1 : index - 1];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
