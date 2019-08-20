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
import { NgxTestsTableComponent } from './component/tables/ngx-tests-table/ngx-tests-table.component';
import { NgxResultsTableComponent } from './component/tables/ngx-results-table/ngx-results-table.component';
import { EnunciadosTableModalComponent } from 'src/app/modals/enunciados-table-modal/enunciados-table-modal.component';
import { ResultadosTableModalComponent } from 'src/app/modals/resultados-table-modal/resultados-table-modal.component';
import { NgxQuestionsTableComponent } from './component/tables/ngx-questions-table/ngx-questions-table.component';
import { NgxCategoriesTableComponent } from './component/tables/ngx-categories-table/ngx-categories-table.component';





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
    NgxTestsTableComponent,
    NgxResultsTableComponent,
    EnunciadosTableModalComponent,
    ResultadosTableModalComponent,
    NgxQuestionsTableComponent,
    NgxCategoriesTableComponent,
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
    NgxTestsTableComponent,
    NgxResultsTableComponent,
    EnunciadosTableModalComponent,
    ResultadosTableModalComponent,
    NgxQuestionsTableComponent,
    NgxCategoriesTableComponent
  ],
  entryComponents: [
    DeleteConfirmationComponent,
    AlteracaoPasswordComponent,
    ChangePasswordAntigaComponent,
    TesteLocalComponent,
    LinkGeradoComponent,
    EnunciadosTableModalComponent,
    ResultadosTableModalComponent,
  ]
})
export class SharedModule { }
