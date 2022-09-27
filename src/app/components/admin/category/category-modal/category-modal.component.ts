import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
})
export class CategoryModalComponent implements OnInit {
  titleModal = 'Agregar Categoria';
  optionBtn: string = 'Guardar';
  categoryForm!: FormGroup;
  submitted = false;
  dataResponse: any;
  constructor(
    public dialogRef: MatDialogRef<CategoryModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private caService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
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
      this.titleModal = 'Editar Categoria';
      this.optionBtn = 'Actualizar';
      this.categoryForm.patchValue(this.editData);
    }
  }

  get f() {
    return this.categoryForm.controls;
  }
  addCategory() {
    this.submitted = true;
    if (!this.editData) {
      if (this.categoryForm.invalid) {
        return;
      }
      this.caService.store(this.categoryForm.value).subscribe((resp: any) => {
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
        this.dialogRef.close();
        this.categoryForm.reset();
        this.submitted = false;
      });
    } else {
      this.updateCategory();
    }
  }

  updateCategory() {
    this.caService
      .update(this.editData.id, this.categoryForm.value)
      .subscribe((data: any) => {
        this.toastr.warning(data.message, 'Exito');
        this.dialogRef.close('update');
      });
  }
}
