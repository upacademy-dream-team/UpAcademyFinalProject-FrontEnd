import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './core';
import { NoPermissionComponent } from './no-permission/no-permission.component';


const routes: Routes = [
{
  path:'',
  loadChildren:() => import('./layout/layout.module').then(module => module.LayoutModule),
  canActivate: [AuthGuard]
},
  {path:'login',component:LoginComponent},
  {path:'not-found', component: NotFoundComponent},
  {path:'no-permission', component: NoPermissionComponent},
  {path:"**", redirectTo:"not-found"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
