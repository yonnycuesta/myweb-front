import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/admin/category/category.component';
import { StatuComponent } from './components/admin/statu/statu.component';
import { TabComponent } from './components/admin/tab/tab.component';
import { LoginPageComponent } from './components/frontend/login-page/login-page.component';
import { RegisterPageComponent } from './components/frontend/register-page/register-page.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'statu', component: StatuComponent },
  { path: 'tab', component: TabComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
