import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userData: any;
  token: any;
  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
  }

  sidebarToggle(){
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
