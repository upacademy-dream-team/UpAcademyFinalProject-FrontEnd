import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './component/footer/footer.component';
import { ModalsComponent } from 'src/app/modals/modals.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModalsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ModalsComponent
  ]
})
export class SharedModule { }
