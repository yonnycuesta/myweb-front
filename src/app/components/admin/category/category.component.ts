import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/services/category.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CategoryModalComponent } from './category-modal/category-modal.component';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: CategoryService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
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
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  editCategory(element: any) {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      width: '250px',
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        this.getAllCategories();
      }
    });
  }
  deleteCategory(id: any) {
    this.dataService.delete(id).subscribe((data: any) => {
      this.getAllCategories();
    });
  }
}
