import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  dataResponse: any;
  token: any;

  constructor(private fb: FormBuilder, private dataService: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.dataService.login(this.loginForm.value).subscribe((resp) =>{
      this.dataResponse = resp;
      if (this.dataResponse.code === 200) {
        this.token = this.dataResponse.data.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['/dashboard']);
        this.toastr.success(JSON.stringify(this.dataResponse.message), JSON.stringify(this.dataResponse.status), {
          timeOut: 3000,
          progressBar: true
        });
      } else if(this.dataResponse.code === 404){
        this.toastr.warning(JSON.stringify(this.dataResponse.message), JSON.stringify(this.dataResponse.status), {
          timeOut: 3000,
          progressBar: true
        });
      }else if(this.dataResponse.code === 401){
        this.toastr.info(JSON.stringify(this.dataResponse.message), JSON.stringify(this.dataResponse.status), {
          timeOut: 3000,
          progressBar: true
        });
      }else if(this.dataResponse.code === 500){
        this.toastr.error(JSON.stringify(this.dataResponse.message), JSON.stringify(this.dataResponse.status), {
          timeOut: 3000,
          progressBar: true
        });
      }
    });
  }

}
