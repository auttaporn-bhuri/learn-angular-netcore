import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/models/iproperty-base';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('form') addPropertyForm!: NgForm;
  @ViewChild('formTabs', { static: false }) formTabs?: TabsetComponent;

  // With get from master data
  propertyTypes: string[] = ['House', 'Apartment', 'Duplex']
  furnishTypes: string[] = ['Fully', 'Semi', 'Unfurnished']

  propertyView: IPropertyBase = {
    Id: null,
    Name: null,
    Price: null,
    SellRent: null,
    PType: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null
  };
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log('yeah , submit succeed')
    console.log('SellRent=' + this.addPropertyForm.value.BasicInfo.SellRent);
    console.log(this.addPropertyForm)
  }

  onBackClick(){
    this._router.navigate(['/']);
  }

  selectTab(_tabId: number) {
    if (this.formTabs?.tabs[_tabId]) {
      this.formTabs.tabs[_tabId].active = true;
    }
  }
}
