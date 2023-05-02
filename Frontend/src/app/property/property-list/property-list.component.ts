import { Component, OnInit } from '@angular/core';
import { HousingService} from '../../services/housing.service'
import { IProperty } from '../IProperty.interface';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  properties: any = [];

  constructor(private _housingService: HousingService) { }

  ngOnInit(): void {
    this._housingService.getAllProperties().subscribe(
      data => {
        this.properties = data;
        console.log(data);
      }, error =>{
        console.log(error);
      }   
    );
  }
}
