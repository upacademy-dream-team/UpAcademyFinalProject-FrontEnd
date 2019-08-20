import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-ngx-questions-table',
  templateUrl: './ngx-questions-table.component.html',
  styleUrls: ['./ngx-questions-table.component.scss']
})
export class NgxQuestionsTableComponent implements OnInit {
  @Input() rows: any;
  @Input() columns: any;
  @Input() temp: any;
  @Output() clickedRow = new EventEmitter();
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor() { }

  ngOnInit() {
  }

  set_text(string, break_point) {
    if( string.length > break_point) {
    string=string.slice(0,break_point)+`...`;
    }
    return string; 
  }

}
