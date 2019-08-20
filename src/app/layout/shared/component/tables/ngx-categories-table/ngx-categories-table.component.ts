import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-ngx-categories-table',
  templateUrl: './ngx-categories-table.component.html',
  styleUrls: ['./ngx-categories-table.component.scss']
})
export class NgxCategoriesTableComponent implements OnInit {
  @Input() rows: any;
  @Input() columns: any;
  @Input() temp: any;
  @Output() clickedRow = new EventEmitter();
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  constructor() { }

  ngOnInit() {
  }

}
