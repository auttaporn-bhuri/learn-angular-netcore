import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import { Property } from 'src/app/models/property';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../IProperty.interface';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public propertyID: number = 9
  property = new Property();
  constructor(
    private _route: ActivatedRoute, 
    private _router: Router,
    private _housingService: HousingService
  ) { }

  ngOnInit(): void {
    this.propertyID = +this._route.snapshot.params['id']; // cast to number
    this._route.data.subscribe(
      (data) => {
        this.property = data['prp']
      }
    )

    this._route.params.subscribe(
      (params)=>{
        this.propertyID = +params['id'];
        this._housingService.getProperty(this.propertyID).subscribe(
          (data: Property) => {
            this.property = data;
          }, error => this._router.navigate(['/'])
        )
      }
    )
  }

}
