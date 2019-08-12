import { Component, OnInit } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-criar-testes',
  templateUrl: './criar-testes.component.html',
  styleUrls: ['./criar-testes.component.scss'],
  providers: [NgbTabsetConfig]
})
export class CriarTestesComponent implements OnInit {

  constructor(config: NgbTabsetConfig) {
    config.justify = 'center';
    config.type = 'pills';
   }

  ngOnInit() {
  }

}
