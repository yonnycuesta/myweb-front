import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StatuService } from 'src/app/services/statu.service';
import { StatuModalComponent } from './statu-modal/statu-modal.component';

@Component({
  selector: 'app-statu',
  templateUrl: './statu.component.html',
  styleUrls: ['./statu.component.scss']
})
export class StatuComponent implements OnInit {

  displayedColumns: string[] = ['name', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: StatuService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllStatus();
  }
  getAllStatus() {
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

  openDialog() {
    const dialogRef = this.dialog.open(StatuModalComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'save') {
        this.getAllStatus();
      }
    });
  }

  editStatu(element: any) {
    const dialogRef = this.dialog.open(StatuModalComponent, {
      width: '250px',
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        this.getAllStatus();
      }
    });
  }
  deleteStatu(id: any) {
    this.dataService.delete(id).subscribe((data: any) => {
      this.getAllStatus();
    });
  }


}
