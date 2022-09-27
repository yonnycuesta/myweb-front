import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StatuService } from 'src/app/services/statu.service';

@Component({
  selector: 'app-statu-modal',
  templateUrl: './statu-modal.component.html',
  styleUrls: ['./statu-modal.component.scss'],
})
export class StatuModalComponent implements OnInit {
  titleModal = 'Agregar Estado';
  optionBtn: string = 'Guardar';
  statuForm!: FormGroup;
  submitted = false;
  dataResponse: any;
  constructor(
    public dialogRef: MatDialogRef<StatuModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private stService: StatuService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.statuForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
    });

    if (this.editData) {
      this.titleModal = 'Editar Estado';
      this.optionBtn = 'Actualizar';
      this.statuForm.patchValue(this.editData);
    }
  }

  get f() {
    return this.statuForm.controls;
  }
  addStatu() {
    this.submitted = true;
    if (!this.editData) {
      if (this.statuForm.invalid) {
        return;
      }
      this.stService.store(this.statuForm.value).subscribe((resp: any) => {
        this.dataResponse = resp;
        if (this.dataResponse.code === 200) {
          this.toastr.success(
            JSON.stringify(this.dataResponse.message),
            JSON.stringify(this.dataResponse.status)
          );
        } else if (this.dataResponse.code === 300) {
          this.toastr.warning(
            JSON.stringify(this.dataResponse.message),
            JSON.stringify(this.dataResponse.status)
          );
        } else {
          this.toastr.error(
            JSON.stringify(this.dataResponse.message),
            JSON.stringify(this.dataResponse.status)
          );
        }
        this.dialogRef.close('save');
        this.statuForm.reset();
        this.submitted = false;
      });
    } else {
      this.updatestatu();
    }
  }

  updatestatu() {
    this.stService
      .update(this.editData.id, this.statuForm.value)
      .subscribe((data: any) => {
        this.toastr.warning(data.message, 'Exito');
        this.dialogRef.close('update');
      });
  }
}
