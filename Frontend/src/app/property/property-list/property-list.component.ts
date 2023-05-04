import { Component, OnInit } from '@angular/core';
import { HousingService} from '../../services/housing.service'
import { IProperty } from '../IProperty.interface';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  sellRent = 1;
  properties: IProperty[]  = [];

  constructor(private _route: ActivatedRoute, private _housingService: HousingService) { }

  ngOnInit(): void {
    if (this._route.snapshot.url.toString()){
      this.sellRent = 2; //Mean we are on rent-property URL else we are on base URL
    }

    this._housingService.getAllProperties(this.sellRent).subscribe(
      data => {
        this.properties = data;
        console.log(data);
      }, error =>{
        console.log(error);
      }   
    );
  }
}
