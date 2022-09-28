import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TabService } from 'src/app/services/tab.service';

@Component({
  selector: 'app-tab-modal',
  templateUrl: './tab-modal.component.html',
  styleUrls: ['./tab-modal.component.scss'],
})
export class TabModalComponent implements OnInit {
  titleModal = 'Agregar Etiqueta';
  optionBtn: string = 'Guardar';
  tabForm!: FormGroup;
  submitted = false;
  dataResponse: any;
  constructor(
    public dialogRef: MatDialogRef<TabModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private stService: TabService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.tabForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });

    if (this.editData) {
      this.titleModal = 'Editar Etiqueta';
      this.optionBtn = 'Actualizar';
      this.tabForm.patchValue(this.editData);
    }
  }

  get f() {
    return this.tabForm.controls;
  }
  addTab() {
    this.submitted = true;
    if (!this.editData) {
      if (this.tabForm.invalid) {
        return;
      }
      this.stService.store(this.tabForm.value).subscribe((resp: any) => {
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
        this.tabForm.reset();
        this.submitted = false;
      });
    } else {
      this.updateTab();
    }
  }

  updateTab() {
    this.stService
      .update(this.editData.id, this.tabForm.value)
      .subscribe((data: any) => {
        this.toastr.warning(data.message, 'Exito');
        this.dialogRef.close('update');
      });
  }
}
