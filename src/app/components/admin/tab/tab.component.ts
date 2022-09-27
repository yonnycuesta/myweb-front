import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TabService } from 'src/app/services/tab.service';
import { TabModalComponent } from './tab-modal/tab-modal.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  displayedColumns: string[] = ['name', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: TabService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllTabs();
  }
  getAllTabs() {
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
    const dialogRef = this.dialog.open(TabModalComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'save') {
        this.getAllTabs();
      }
    });
  }

  editTab(element: any) {
    const dialogRef = this.dialog.open(TabModalComponent, {
      width: '250px',
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        this.getAllTabs();
      }
    });
  }
  deleteTab(id: any) {
    this.dataService.delete(id).subscribe((data: any) => {
      this.getAllTabs();
    });
  }

}
