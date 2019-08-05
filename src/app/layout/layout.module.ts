import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './shared/component/footer/footer.component';
import { ConsultarResultadosComponent } from './consultar-resultados/consultar-resultados.component';
import { ConsultarEnunciadosComponent } from './consultar-enunciados/consultar-enunciados.component';
import { CriarTestesComponent } from './criar-testes/criar-testes.component';
import { SettingsComponent } from './settings/settings.component';
import { IniciarTesteComponent } from './iniciar-teste/iniciar-teste.component';


@NgModule({
  declarations: [LayoutComponent, MainComponent, ConsultarResultadosComponent, ConsultarEnunciadosComponent, CriarTestesComponent, IniciarTesteComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class LayoutModule { }
