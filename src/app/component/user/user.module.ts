import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user.routing.module';
import { UserCadastroComponent } from './cadastro/user-cadastro.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select'
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserDelComponent } from './cadastro/user-del.component';

@NgModule({
  declarations: [UserComponent,UserCadastroComponent,UserDelComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    NgbModule
  ]
})
export class UserModule { }
