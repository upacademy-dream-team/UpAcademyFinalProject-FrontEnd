import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './shared/component/footer/footer.component';


@NgModule({
  declarations: [LayoutComponent, MainComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class LayoutModule { }
