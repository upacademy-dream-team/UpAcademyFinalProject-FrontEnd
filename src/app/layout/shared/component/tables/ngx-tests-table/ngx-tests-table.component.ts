import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UserServiceService } from 'src/app/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngx-tests-table',
  templateUrl: './ngx-tests-table.component.html',
  styleUrls: ['./ngx-tests-table.component.scss']
})
export class NgxTestsTableComponent implements OnInit {

  @Input() rows: any;
  @Input() columns: any;
  @Input() temp: any;
  @Output() clickedRow = new EventEmitter();
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(
    private userApi: UserServiceService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.testName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  clickRow(row) {
    this.clickedRow.emit(row);
  }

}
