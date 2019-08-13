import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ngx-table',
  templateUrl: './ngx-table.component.html',
  styleUrls: ['./ngx-table.component.scss']
})
export class NgxTableComponent implements OnInit {

  @Input() rows: any;
  @Input() columns: any;


  constructor() {
  }


  ngOnInit() {
  }

}
