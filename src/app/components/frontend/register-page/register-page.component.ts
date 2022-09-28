import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from './confirmed.validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  dataResponse: any;
  
  constructor(private fb: FormBuilder, private dataService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]],
    }, {
      validator: MustMatch('password', 'password_confirmation')
    });
  }

  get f() { return this.registerForm.controls; }
  register(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.dataService.store(this.registerForm.value).subscribe((data: any) => {
      this.dataResponse = data;
      if (this.dataResponse.code === 200) {
        this.toastr.success(
          JSON.stringify(this.dataResponse.message),
          JSON.stringify(this.dataResponse.status)
        );
        this.registerForm.reset();
      } else if (this.dataResponse.code === 404) {
        this.toastr.error(
          JSON.stringify(this.dataResponse.message),
          JSON.stringify(this.dataResponse.status)
        );
      }
      this.submitted = false;
    });
  }

}
