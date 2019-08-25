import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { QuestionServiceService } from 'src/app/core/services/question-service/question-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReplaySubject } from 'rxjs';
import { DeleteQuestionComponent } from 'src/app/modals/delete-question/delete-question.component';
import { CategoryServiceService } from 'src/app/core/services/category-service/category-service.service';

@Component({
  selector: 'app-ngx-questions-table',
  templateUrl: './ngx-questions-table.component.html',
  styleUrls: ['./ngx-questions-table.component.scss']
})
export class NgxQuestionsTableComponent implements OnInit {
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
    private userApi: QuestionServiceService,
    private userApi2: CategoryServiceService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  // tslint:disable-next-line: variable-name
  set_text(string, break_point) {
    if ( string.length > break_point) {
    string = string.slice(0, break_point) + `...`;
    }
    return string;
  }


  clickRow(row) {
    this.clickedRow.emit(row);
  }

  onActivate(event) {
    if (event.type === 'click') {
      console.log(event.row);
    }
  }

  onClickFas(row, event) {

    this.id = row.id;

    console.log(this.id);

    if (event.target.classList.value === 'fas fa-trash fa-lg') {

      const modalRef = this.modalService.open(DeleteQuestionComponent);

      modalRef.componentInstance.messageDeleteTeste = 'Deseja mesmo apagar esta Pergunta?';

      modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {

        this.userApi.removeQuestion(this.id).subscribe(
          data => {
            console.log(data);
            this.userApi.getAllQuestions();
            this.userApi2.getAllCategories();
            this.modalService.dismissAll();
          } , (error) => {
            console.log(error.error);
            this.msg = /*'Parâmetros de utilizador em falta.Verifique se todos os dados foram inseridos'*/
            error.error;
            this.check = 1 ;
            modalRef.componentInstance.messageMsg = 'Existem enunciados que contêm a pergunta que deseja apagar!';
            modalRef.componentInstance.check = this.check;
            console.log(this.check);
            console.log(this.msg);

          }
        );
      });
    }
  }

}

