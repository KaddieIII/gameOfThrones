import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousesComponent } from './houses/houses.component';
import { PersonsComponent } from './persons/persons.component';
import { QuotesComponent } from './quotes/quotes.component';

const routes: Routes = [
  { path: '', redirectTo: 'pickjobs', pathMatch: 'full'},
  { path: 'houses', component: HousesComponent },
  { path: 'persons', component: PersonsComponent },
  { path: 'quotes', component: QuotesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
