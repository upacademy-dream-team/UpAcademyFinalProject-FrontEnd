import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteTestComponent } from 'src/app/modals/delete-test/delete-test.component';
import { TestServiceService } from 'src/app/core/services/test-service/test-service.service';
import { ReplaySubject } from 'rxjs';
import { TestShowInModalComponent } from 'src/app/modals/test-show-in-modal/test-show-in-modal.component';

@Component({
  selector: 'app-ngx-tests-table',
  templateUrl: './ngx-tests-table.component.html',
  styleUrls: ['./ngx-tests-table.component.scss']
})
export class NgxTestsTableComponent implements OnInit {

  public id;
  msg: any;
  check: number;
  public tests$: ReplaySubject<any[]> = new ReplaySubject(1);
  @Input() rows: any;
  @Input() columns: any;
  @Input() temp: any;
  @Output() clickedRow = new EventEmitter();
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(
    private userApi: TestServiceService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    /*     this.tests$=this.userApi.tests$;
        this.tests$.subscribe(tests=>{
          this.rows = tests;
        }) */
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.test.testName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  clickRow(row) {
    this.clickedRow.emit(row);
  }



  onClickFas(event) {
    console.log(event);
    this.id = event.test.id;

    console.log(this.id);

    const modalRef = this.modalService.open(DeleteTestComponent);

    modalRef.componentInstance.messageDeleteTeste = 'Deseja mesmo apagar este Enunciado?';

    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {

      this.userApi.removeTest(this.id).subscribe(
        data => {
          console.log(data);
          this.userApi.getAllTests();
          this.modalService.dismissAll();
        }, (error) => {
          console.log(error.error);
          this.msg = /*'Parâmetros de utilizador em falta.Verifique se todos os dados foram inseridos'*/
            error.error;
          this.check = 1;
          modalRef.componentInstance.messageMsg = 'Existem testes realizados com este Enunciado!';
          modalRef.componentInstance.check = this.check;
          console.log(this.check);
          console.log(this.msg);

        }
      );
    });
  }

  onActivate(event) {

    console.log(event);


    if (event.type === 'click') {
      if (event.event.target.classList.value === 'fas fa-trash fa-lg') {
        this.onClickFas(event.row);
      } else {
        const modalRef = this.modalService.open(TestShowInModalComponent,
          { size: 'lg', backdrop: 'static',});

        modalRef.componentInstance.messageTestTotal = event.row.test;

      }
    }
  }
}
