import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './component/footer/footer.component';
import { ModalsComponent } from 'src/app/modals/new-user/modals.component';
import { TablesComponent } from './component/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DeleteConfirmationComponent } from 'src/app/modals/delete-confirmation/delete-confirmation.component';
import { AlteracaoPasswordComponent } from 'src/app/modals/alteracao-password/alteracao-password.component';
import { ChangePasswordAntigaComponent } from 'src/app/modals/change-password-antiga/change-password-antiga.component';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModalsComponent,
    TablesComponent,
    DeleteConfirmationComponent,
    AlteracaoPasswordComponent,
    ChangePasswordAntigaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    NgxDatatableModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ModalsComponent,
    TablesComponent,
    DeleteConfirmationComponent,
    AlteracaoPasswordComponent,
    ChangePasswordAntigaComponent,
  ],
  entryComponents: [
    DeleteConfirmationComponent,
    AlteracaoPasswordComponent,
    ChangePasswordAntigaComponent,
  ]
})
export class SharedModule { }
