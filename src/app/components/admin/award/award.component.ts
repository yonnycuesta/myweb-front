import { StatuService } from 'src/app/services/statu.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AwardService } from 'src/app/services/award.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-award',
  templateUrl: './award.component.html',
  styleUrls: ['./award.component.scss'],
})
export class AwardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'icon', 'qty', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  awardForm!: FormGroup;
  optionBtn: string = 'Agregar';
  status: any[] = [];
  dataResponse: any;
  submitted: boolean = false;
  isEdit: boolean = false;
  idAward: string = '';

  constructor(
    private dataService: AwardService,
    private fb: FormBuilder,
    private sta: StatuService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllAwards();
    this.createForm();
    this.loadStatus();
  }

  loadStatus() {
    this.sta.all().subscribe((data: any) => {
      this.status = data.data;
    });
  }
  createForm() {
    this.awardForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(70)]],
      icon: [null, [Validators.maxLength(70)]],
      qty: ['', [Validators.required]],
      status_id: ['', [Validators.required]],
    });
  }

  getAllAwards() {
    this.dataService.all().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get f() {
    return this.awardForm.controls;
  }
  addAward() {
    this.submitted = true;
    if (!this.isEdit) {
      if (this.awardForm.invalid) {
        return;
      }
      this.dataService.store(this.awardForm.value).subscribe((data: any) => {
        this.dataResponse = data;
        if (this.dataResponse.code === 200) {
          this.toastr.success(
            JSON.stringify(this.dataResponse.message),
            JSON.stringify(this.dataResponse.status)
          );
        } else if (this.dataResponse.code === 400) {
          this.toastr.error(
            JSON.stringify(this.dataResponse.message),
            JSON.stringify(this.dataResponse.status)
          );
        }
        this.getAllAwards();
        this.awardForm.reset();
        this.submitted = false;
      });
    } else {
      this.updateAward();
    }
  }
  editAward(element: any) {
    this.isEdit = true;
    this.optionBtn = 'Editar';
    this.awardForm.patchValue({
      name: element.name,
      icon: element.icon,
      qty: element.qty,
      status_id: element.status_id,
    });
    this.idAward = element.id;
  }

  updateAward() {
    this.submitted = true;
    if (this.awardForm.invalid) {
      return;
    }
    this.dataService
      .update(this.idAward, this.awardForm.value)
      .subscribe((data: any) => {
        this.dataResponse = data;
        if (this.dataResponse.code === 200) {
          this.toastr.info(
            JSON.stringify(this.dataResponse.message),
            JSON.stringify(this.dataResponse.status)
          );
        } else if (this.dataResponse.code === 400) {
          this.toastr.error(
            JSON.stringify(this.dataResponse.message),
            JSON.stringify(this.dataResponse.status)
          );
        }
        this.getAllAwards();
        this.awardForm.reset();
        this.isEdit = false;
        this.optionBtn = 'Agregar';
        this.submitted = false;
      });
  }

  deleteAward(id: any) {
    this.dataService.delete(id).subscribe((data: any) => {
      this.dataResponse = data;
      if (this.dataResponse.code === 200) {
        this.toastr.warning(
          JSON.stringify(this.dataResponse.message),
          JSON.stringify(this.dataResponse.status)
        );
      } else if (this.dataResponse.code === 500) {
        this.toastr.error(
          JSON.stringify(this.dataResponse.message),
          JSON.stringify(this.dataResponse.status)
        );
      }
      this.getAllAwards();
    });
  }
}
