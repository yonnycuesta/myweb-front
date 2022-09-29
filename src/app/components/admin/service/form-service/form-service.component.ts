import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OwnService } from 'src/app/services/own.service';
import { StatuService } from 'src/app/services/statu.service';
import { ServiceComponent } from '../service.component';

@Component({
  selector: 'form-service',
  templateUrl: './form-service.component.html',
  styleUrls: ['./form-service.component.scss']
})
export class FormServiceComponent implements OnInit {

  optionBtn: string = 'Guardar';
  serviceForm!: FormGroup;
  dataResponse: any;
  status: any[] = [];
  submitted: boolean = false;
  isEdit: boolean = false;
  idAward: string = '';

  constructor(private fb: FormBuilder,  private sta: StatuService,
    private toastr: ToastrService, private dataService: OwnService) { }

    ngOnInit(): void {
    
      this.createForm();
      this.loadStatus();
      
    }

  
    loadStatus() {
      this.sta.all().subscribe((data: any) => {
        this.status = data.data;
      });
    }
    createForm() {
      this.serviceForm = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(70)]],
        icon: [null, [Validators.maxLength(70)]],
        description: ['', [Validators.required, Validators.maxLength(1200)]],
        status_id: ['', [Validators.required]],
      });
    }

    get f() {
      return this.serviceForm.controls;
    }

  addService(){
    
    this.submitted = true;
    if (this.serviceForm.invalid) {
      return;
    }
    this.dataService.store(this.serviceForm.value).subscribe(
      (data: any) => {
        this.dataResponse = data;
        this.toastr.success(this.dataResponse.message, 'Éxito');
        this.submitted = false;
        this.serviceForm.reset();
      },
      (error) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }
}
