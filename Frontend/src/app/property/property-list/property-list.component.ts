import { Component, OnInit } from '@angular/core';
import { HousingService} from '../../services/housing.service'
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/models/iproperty-base';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  sellRent = 1;
  properties: IPropertyBase[] = [];
  City = '';
  SearchCity = '';
  SortByParam = '';
  SortDirection = 'asc';

  constructor(private _route: ActivatedRoute, private _housingService: HousingService) { }

  ngOnInit(): void {
    if (this._route.snapshot.url.toString()){
      this.sellRent = 2; //Mean we are on rent-property URL else we are on base URL
    }

    this._housingService.getAllProperties(this.sellRent).subscribe(
      data => {
        this.properties = data;

        //let prop = localStorage.getItem('newProp');
        //if (prop) {
        //  const newProperty = JSON.parse(prop);
        //  this.properties = [newProperty, ...this.properties];
        //} 
        console.log(data);
      }, error =>{
        console.log(error);
      }   
    );
  }

  onCityFilter(){
    this.SearchCity = this.City;
  }

  onCityFilterClear(){
    this.SearchCity = '';
    this.City = '';
  }

  onSortDirection(){
    if (this.SortDirection === 'desc'){
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }
}
