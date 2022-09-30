import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OwnService } from 'src/app/services/own.service';
import { StatuService } from 'src/app/services/statu.service';

@Component({
  selector: 'form-service',
  templateUrl: './form-service.component.html',
  styleUrls: ['./form-service.component.scss'],
})
export class FormServiceComponent implements OnInit {
  serviceForm!: FormGroup;
  dataResponse: any;
  status: any[] = [];
  submitted: boolean = false;
  idService: string = '';
  // Data received from parent component
  @Input() dataReceived: any;

  constructor(
    private fb: FormBuilder,
    private sta: StatuService,
    private toastr: ToastrService,
    private dataService: OwnService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadStatus();
    this.editService();
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

  validateForm() {
    if (this.serviceForm.invalid) {
      return;
    }
  }
  addService() {
    if (this.dataReceived == null) {
      this.submitted = true;
      this.validateForm();
      this.dataService.store(this.serviceForm.value).subscribe((data: any) => {
        this.dataResponse = data;
        if (this.dataResponse.code === 200) {
          this.toastr.success(
            JSON.stringify(this.dataResponse.message),
            JSON.stringify(this.dataResponse.status)
          );
          this.submitted = false;
          this.serviceForm.reset();
        } else if (this.dataResponse.code === 400) {
          this.toastr.error(
            JSON.stringify(this.dataResponse.message),
            JSON.stringify(this.dataResponse.status)
          );
        }
      });
    } else {
      this.updateService();
    }
  }

  editService() {
    this.serviceForm.patchValue({
      name: this.dataReceived.name,
      icon: this.dataReceived.icon,
      description: this.dataReceived.description,
      status_id: this.dataReceived.status_id,
    });
    this.idService = this.dataReceived.id;
  }

  updateService() {
    this.validateForm();
    this.dataService
      .update(this.idService, this.serviceForm.value)
      .subscribe((data: any) => {
        this.dataResponse = data;
        if (this.dataResponse.code === 200) {
          this.toastr.info(
            JSON.stringify(this.dataResponse.message),
            JSON.stringify(this.dataResponse.status)
          );
          this.submitted = false;
          this.serviceForm.reset();
          this.dataReceived = null;
        } else if (this.dataResponse.code === 404) {
          this.toastr.error(
            JSON.stringify(this.dataResponse.message),
            JSON.stringify(this.dataResponse.status)
          );
        }
      });
  }
}
