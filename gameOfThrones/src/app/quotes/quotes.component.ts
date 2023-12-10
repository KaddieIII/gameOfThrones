import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
  loading = true;
  quotes: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getQuotes();
  }

  getQuotes() {
    this.loading = true;
    this.api.get('v1/random/5').subscribe((response) => {
      this.loading = false;
      this.quotes = response;
    });
  }
}
