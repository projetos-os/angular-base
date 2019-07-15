import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserCadastroComponent } from './cadastro/user-cadastro.component';
import { UserDelComponent } from './cadastro/user-del.component';



const routes: Routes = [
  {path: '',component:UserComponent,data:{pageTitle:"Usuários",bc:[{title:"Home",class:""},{title:"Usuários",class:"active"}]}},
  {path: 'add',component:UserCadastroComponent,data:{pageTitle:"Cadastro de Usuário",bc:[{title:"Home",class:""},{title:"Usuários",class:""},{title:"Adicionar",class:"active"}]}},
  {path: 'edit/:id',component:UserCadastroComponent},
  {path: 'del/:id',component:UserDelComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
