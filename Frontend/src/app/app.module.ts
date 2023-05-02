import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { Routes, RouterModule} from '@angular/router'

import { PropertyCardComponent} from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';

const appRoutes: Routes = [
  {path: '', component: PropertyListComponent},
  //{path: '**', component: PropertyListComponent},
  {path: 'rent-property', component: PropertyListComponent},
  {path: 'add-property', component: AddPropertyComponent},
  {path: 'property-detail/:id', component: PropertyDetailComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    NavbarComponent,
    AddPropertyComponent,
    PropertyDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
