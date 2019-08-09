import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  @Input() header: any;
  @Input() data$: any;
  @Input() labels: any;
  @Output() clickedRow = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickRow(row) {
    this.clickedRow.emit(row);
  }

}
