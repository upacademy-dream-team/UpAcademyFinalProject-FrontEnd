import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteResultadoCandidatoComponent } from 'src/app/modals/delete-resultado-candidato/delete-resultado-candidato.component';
import { SolvedTestServiceService } from 'src/app/core/services/solvedTest-service/solved-test-service.service';
import { UserServiceService } from 'src/app/core';
import { ResultadosTableModalComponent } from 'src/app/modals/resultados-table-modal/resultados-table-modal.component';

@Component({
  selector: 'app-ngx-results-table',
  templateUrl: './ngx-results-table.component.html',
  styleUrls: ['./ngx-results-table.component.scss']
})
export class NgxResultsTableComponent implements OnInit {
  public id;
  @Input() rows: any;
  @Input() columns: any;
  @Input() temp: any;
  @Output() clickedRow = new EventEmitter();
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(
    private userApi: UserServiceService,
    private userApi2: SolvedTestServiceService,
    private modalService: NgbModal
  ) { }


  ngOnInit() {
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.solvedTest.candidate.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;

    this.table.offset = 0;
  }

  clickRow(row) {
    this.clickedRow.emit(row);

  }

  millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    let y = + seconds;
    if (minutes === 0) {
      return (y < 10 ? '0' : '') + seconds + ' s';
    } else {
      return minutes + ' min ' + (y < 10 ? '0' : '') + seconds + ' s';
    }
  }

  onClickFas(event) {

    const modalRef = this.modalService.open(DeleteResultadoCandidatoComponent);

    modalRef.componentInstance.messageDeleteResultadoCandidato = 'Deseja mesmo apagar o resultado do Candidato?';
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {

      this.userApi2.removeSolvedTest(event.solvedTest.id).subscribe(
        data => {
          console.log(data);
          this.userApi2.getAllSolvedTests();
        }
      );
      this.modalService.dismissAll();
    });

  }


  onActivate(event) {

    console.log(event);

    if (event.type === 'click') {
      if (event.event.target.classList.value === 'fas fa-trash fa-lg') {
        this.onClickFas(event.row);
      } else {
        const modalRef = this.modalService.open(ResultadosTableModalComponent,
          { size: 'lg', backdrop: 'static', });

        //modalRef.componentInstance.messageTestTotal = '';

      }
    }

  }
}
