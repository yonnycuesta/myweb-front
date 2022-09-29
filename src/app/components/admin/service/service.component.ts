import { Component, EventEmitter, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OwnService } from 'src/app/services/own.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  displayedColumns: string[] = ['name', 'icon', 'description', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  serviceForm!: FormGroup;
  optionBtn: string = 'Agregar';
  status: any[] = [];
  dataResponse: any;
  submitted: boolean = false;
  isEdit: boolean = false;
  idAward: string = '';
  addOption: boolean = false;

  constructor(private dataService: OwnService,) { 
  }

  ngOnInit(): void {
    this.getAlServices();
  }

  habilitarAdd(){
    this.addOption = !this.addOption;
  }
  getAlServices() {
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

  editService(element: any) {
    console.log('editService', element);
  }

  deleteService(id: string) {
   try{
    this.dataService.delete(id).subscribe((data: any) => {
      this.getAlServices();
    });
   }catch(error){
     console.log('error', error);
   }
  }
  
}
