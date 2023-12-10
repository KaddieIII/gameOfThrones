import { Component, OnDestroy, OnInit } from '@angular/core';
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
  quote: string = '';
  searchText: string = '';
  private subscription: Subscription = new Subscription();
  
  constructor(private api: ApiService) {}
  
  ngOnInit(): void {
    this.getPersons();
    this.subscription = interval(10000).subscribe(() => {
      this.randomQuote();
    });
  }

  getPersons() {
    this.loading = true;
    this.api.get('v1/characters').subscribe((response) => {
      this.loading = false;
      this.persons = response;
      console.log('persons: ', this.persons);
    });
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

  randomQuote() {
    if (this.person) {
      const randomIndex = Math.floor(Math.random() * this.person.quotes.length);
      this.quote = this.person.quotes[randomIndex];
    }
  }

  nextQuote() {
    let index = this.person.quotes.indexOf(this.quote);
    return this.person.quotes[index === this.person.quotes.length ? 0 : index + 1];
  }

  prevQuote() {
    let index = this.person.quotes.indexOf(this.quote);
    return this.person.quotes[index === 0 ? this.person.quotes.length : index - 1];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
