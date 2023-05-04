import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('form') addPropertyForm!: NgForm;
  
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log('yeah , submit succeed')
    console.log(this.addPropertyForm)
  }

  onBackClick(){
    this._router.navigate(['/']);
  }
}
