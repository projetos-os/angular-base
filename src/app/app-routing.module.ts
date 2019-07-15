import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { LayoutComponent } from './layout/layout/layout.component';

const routes: Routes = [
  // { path: 'login', loadChildren: './user/login.module#LoginModule', data: {customLayout: true} },  

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'user', loadChildren: './component/user/user.module#UserModule' },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: '/user' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
