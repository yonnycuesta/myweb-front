import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginPageComponent } from './components/frontend/login-page/login-page.component';
import { RegisterPageComponent } from './components/frontend/register-page/register-page.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CategoryModalComponent } from './components/admin/category/category-modal/category-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { StatuComponent } from './components/admin/statu/statu.component';
import { StatuModalComponent } from './components/admin/statu/statu-modal/statu-modal.component';
import { TabComponent } from './components/admin/tab/tab.component';
import { TabModalComponent } from './components/admin/tab/tab-modal/tab-modal.component';
import { AwardComponent } from './components/admin/award/award.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    LoginPageComponent,
    RegisterPageComponent,
    CategoryComponent,
    CategoryModalComponent,
    StatuComponent,
    StatuModalComponent,
    TabComponent,
    TabModalComponent,
    AwardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
