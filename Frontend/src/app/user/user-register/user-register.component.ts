import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  user!: User;
  userSubmitted: boolean = false;

  constructor(
    private _fb: FormBuilder, 
    private _userService: UserService,
    private _alertify: AlertifyService) { }

  ngOnInit(): void {
    //this.registrationForm = new FormGroup({
    //  userName: new FormControl(null, Validators.required),
    //  email: new FormControl(null, [Validators.required, Validators.email]),
    //  password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //  confirmPassword: new FormControl(null, Validators.required),
    //  mobile: new FormControl(null, [Validators.required, Validators.minLength(10)])
    //}, this.passwordMatchingValidator(this.registrationForm));

    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registrationForm = this._fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.minLength(10)]]
    }, {validators: this.passwordMatchingValidator(this.registrationForm)})
  }

  // Custome validator
  passwordMatchingValidator(_formGroup: FormGroup): ValidatorFn {
    return (_formGroup: AbstractControl<FormGroup>) => {
      if (_formGroup.get('password')?.value === _formGroup.get('confirmPassword')?.value){
        return null;
      } else {
        return {notmatched: true};
      }
    }    
  }

  onSubmit(){
    console.log(this.registrationForm.value);
    this.userSubmitted = true
    if (!this.registrationForm.valid){
      this._alertify.error('Please provide require field')
      return;
    }  
    //this.user = Object.assign(this.user, this.registrationForm.value);  
    this._userService.addUser(this.userData());
    this.registrationForm.reset();
    this.userSubmitted = false;
    this._alertify.success('Yeah !!!, you successfuly registered')
  }  

  userData(): User{
    return this.user = {
      userName: this.userName.value,
      email:    this.email.value,
      password: this.password.value,
      mobile:   this.mobile.value
    }
  }

  get userName() {
    return this.registrationForm.get('userName') as FormControl
  }

  get email() {
    return this.registrationForm.get('email') as FormControl
  }

  get password() {
    return this.registrationForm.get('password') as FormControl
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl
  }

  get mobile() {
    return this.registrationForm.get('mobile') as FormControl
  }
}
