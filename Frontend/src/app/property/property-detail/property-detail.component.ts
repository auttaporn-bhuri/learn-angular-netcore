import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public propertyID: number = 9
  constructor(private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.propertyID = +this._route.snapshot.params['id']; // cast to number

    this._route.params.subscribe(
      (params)=>{
        this.propertyID = +params['id'];
      }
    )
  }

  onSelectNextPage(){
    
    this.propertyID += 1;
    this._router.navigate(['/property-detail', this.propertyID]);
    //this._router.navigate(['/property-detail', this.propertyID], {relativeTo: this._route});

  }

}
