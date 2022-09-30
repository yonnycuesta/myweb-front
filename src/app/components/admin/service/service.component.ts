import { Component, EventEmitter, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
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

  dataResponse: any;
  addOption: boolean = false;
  updateOption: boolean = false;
  dataSent: any[] = [];

  constructor(private dataService: OwnService,
    private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.getAlServices();
  }

  habilitarAdd(){
    this.addOption = !this.addOption;
    this.updateOption = false;
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

  sentData(element: any) {
    this.updateOption = true;
    this.addOption = false;
    // agregar un elemento nuevo al array dataSent y eliminar el anterior
    this.dataSent.splice(0,1,element);
  }

  deleteService(id: string) {
   try{
    this.dataService.delete(id).subscribe((data: any) => {
      this.dataResponse = data;
      if (this.dataResponse.code === 200) {
        this.toastr.warning(
          JSON.stringify(this.dataResponse.message),
          JSON.stringify(this.dataResponse.status)
        );
      } else if (this.dataResponse.code === 404) {
        this.toastr.error(
          JSON.stringify(this.dataResponse.message),
          JSON.stringify(this.dataResponse.status)
        );
      }
      this.getAlServices();
    });
   }catch(error){
     console.log('error', error);
   }
  }
  
}
