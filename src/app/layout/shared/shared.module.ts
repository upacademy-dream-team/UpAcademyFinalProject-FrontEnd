import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './component/footer/footer.component';
import { ModalsComponent } from 'src/app/modals/modals.component';
import { TablesComponent } from './component/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModalsComponent,
    TablesComponent
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
    TablesComponent
  ]
})
export class SharedModule { }
