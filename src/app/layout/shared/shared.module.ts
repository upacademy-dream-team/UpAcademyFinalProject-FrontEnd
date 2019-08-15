import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './component/footer/footer.component';
import { ModalsComponent } from 'src/app/modals/new-user/modals.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DeleteConfirmationComponent } from 'src/app/modals/delete-confirmation/delete-confirmation.component';
import { AlteracaoPasswordComponent } from 'src/app/modals/alteracao-password/alteracao-password.component';
import { ChangePasswordAntigaComponent } from 'src/app/modals/change-password-antiga/change-password-antiga.component';
import { TesteLocalComponent } from 'src/app/modals/teste-local/teste-local.component';
import { LinkGeradoComponent } from 'src/app/modals/link-gerado/link-gerado.component';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModalsComponent,
    DeleteConfirmationComponent,
    AlteracaoPasswordComponent,
    ChangePasswordAntigaComponent,
    TesteLocalComponent,
    LinkGeradoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ModalsComponent,
    DeleteConfirmationComponent,
    AlteracaoPasswordComponent,
    ChangePasswordAntigaComponent,
    TesteLocalComponent,
    LinkGeradoComponent,
  ],
  entryComponents: [
    DeleteConfirmationComponent,
    AlteracaoPasswordComponent,
    ChangePasswordAntigaComponent,
    TesteLocalComponent,
    LinkGeradoComponent,
  ]
})
export class SharedModule { }
