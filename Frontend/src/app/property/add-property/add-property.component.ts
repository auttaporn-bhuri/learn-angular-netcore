import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/models/iproperty-base';
import { Property } from 'src/app/models/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  //@ViewChild('form') addPropertyForm!: NgForm;
  @ViewChild('formTabs', { static: false }) formTabs?: TabsetComponent;

  addPropertyForm! : FormGroup;
  nextClicked: boolean = false; 
  property = new Property();

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

  constructor(
    private _router: Router, 
    private _fb: FormBuilder, 
    private _housingService: HousingService,
    private _alerttify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.createAddPropertyForm();
  }

  createAddPropertyForm(){
    return this.addPropertyForm = this._fb.group({
      BasicInfo: this._fb.group({
        SellRent: ['1' , Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required]
      }),

      PriceInfo: this._fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),

      AddressInfo: this._fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherInfo: this._fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      })
    })
  }

  onSubmit(){
    this.nextClicked = true;
    if (!this.allTabValid()){
      this._alerttify.error('Please review the form and provide all valid entries')
    } else {
      this.mapProperty();
      this._housingService.addProperty(this.property);
      this._alerttify.success('Yeah , your property listed successfuly on our website')
      console.log(this.addPropertyForm)

      if (this.SellRent.value === '2'){
        this._router.navigate(['/rent-property'])
      } else{
        this._router.navigate(['/'])
      }
    }
  }

  mapProperty(): void {
    this.property.Id = this._housingService.newPropertyId();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK     = this.BHK.value;
    this.property.PType   = this.PType.value;
    this.property.Name    = this.Name.value;
    this.property.City    = this.City.value;
    this.property.FType   = this.FType.value;
    this.property.Price   = this.Price.value;
    this.property.Security    = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea   = this.BuiltArea.value;
    this.property.CarpetArea  = this.CarpetArea.value;
    this.property.FloorNo     = this.FloorNo.value;
    this.property.TotalFloor  = this.TotalFloor.value;
    this.property.Address     = this.Address.value;
    this.property.Address2    = this.LandMark.value;
    this.property.RTM   = this.RTM.value;
    this.property.AOP   = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance  = this.MainEntrance.value;
    this.property.Possession    = this.PossessionOn.value;
    this.property.Description   = this.Description.value;
    this.property.PostedOn      = new Date().toString();
  }

  allTabValid(): boolean{
    if (!this.formTabs) {
      return false;  
    } else {
      if (this.BasicInfo.invalid){
        this.formTabs.tabs[0].active = true;
        return false;
      }

      if (this.PriceInfo.invalid){
        this.formTabs.tabs[1].active = true;
        return false;
      }

      if (this.AddressInfo.invalid){
        this.formTabs.tabs[2].active = true;
        return false;
      }

      if (this.OtherInfo.invalid){
        this.formTabs.tabs[3].active = true;
        return false;
      }

      return true;
    }
  }


  onBackClick(){
    this._router.navigate(['/']);
  }

  selectTab(_tabId: number, _isCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (!_isCurrentTabValid){
      return;
    } 

    if (this.formTabs?.tabs[_tabId]) {
      this.formTabs.tabs[_tabId].active = true;
    }
  }

  // #region Getter Method <FormGroups>
  get BasicInfo(){
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }
  
  get PriceInfo(){
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }

  get AddressInfo(){
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }

  get OtherInfo(){
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }

  //#region <Form Controls>
  get SellRent() {
    return this.addPropertyForm.get(['BasicInfo', 'SellRent']) as FormControl
  }

  get BHK() {
    return this.BasicInfo.controls['BHK'] as FormControl;
  }

  get PType() {
    return this.BasicInfo.controls['PType'] as FormControl;
  }

  get FType() {
    return this.BasicInfo.controls['FType'] as FormControl;
  }

  get Name() {
    return this.BasicInfo.controls['Name'] as FormControl;
  }

  get City() {
    return this.BasicInfo.controls['City'] as FormControl;
  }

  get Price() {
    return this.addPropertyForm.get(['PriceInfo', 'Price']) as FormControl
  }

  get BuiltArea() {
    return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }

  get CarpetArea() {
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }

  get Security() {
    return this.PriceInfo.controls['Security'] as FormControl;
  }

  get Maintenance() {
    return this.PriceInfo.controls['Maintenance'] as FormControl;
  }

  get FloorNo() {
    return this.AddressInfo.controls['FloorNo'] as FormControl;
  }

  get TotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }

  get Address() {
    return this.AddressInfo.controls['Address'] as FormControl;
  }

  get LandMark() {
    return this.AddressInfo.controls['LandMark'] as FormControl;
  }

  get RTM() {
    return this.OtherInfo.controls['RTM'] as FormControl;
  }

  get PossessionOn() {
    return this.OtherInfo.controls['PossessionOn'] as FormControl;
  }

  get AOP() {
    return this.OtherInfo.controls['AOP'] as FormControl;
  }

  get Gated() {
    return this.OtherInfo.controls['Gated'] as FormControl;
  }

  get MainEntrance() {
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls['Description'] as FormControl;
  }

//#endregion

}
