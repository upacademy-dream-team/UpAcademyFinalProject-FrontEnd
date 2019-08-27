import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from 'src/app/core';
import { TestServiceService } from 'src/app/core/services/test-service/test-service.service';
import { SolvedTestServiceService } from 'src/app/core/services/solvedTest-service/solved-test-service.service';

@Component({
  selector: 'app-resultados-table-modal',
  templateUrl: './resultados-table-modal.component.html',
  styleUrls: ['./resultados-table-modal.component.scss']
})
export class ResultadosTableModalComponent implements OnInit {
  closeResult: string;
  public testRow = [];
  @Input()check: number;
  @Input() messageMsg;
  @Input() messageTestName;
  @Input() id;
  @Input() TestQuestions;
  @Input() TestAnswers;
  @Input() messageTestTotal;
  public myTest;
  public allData;
  public enunciado;

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private userApi: UserServiceService,
    private testService: TestServiceService,
    private solvedService: SolvedTestServiceService,
    ) {}

  ngOnInit() {
    
    this.solvedService.getSolvedTest(1).subscribe(data=> 
      { this.allData=data; 
        console.log(data);
        this.myTest=this.allData.solvedTest, 
        console.log(this.myTest);
        let ID=this.myTest.testID;
        this.testService.getTestByID(ID).subscribe(data=>{
          this.enunciado=data; 
          console.log(this.enunciado);
        });
      });
    /* console.log(this.messageTestTotal.id);
    this.testService.getTestWithSolutions(this.messageTestTotal.id).subscribe(data=> {this.myTest=data; console.log(data)}); */
  }

  open(content: any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  private print(){
    console.log("entrou");
  }

  private givenAnswerToQuestion(questionID){
      let answers=this.myTest.answer;
      for(let i=0; i<answers.length;i++){
        if(answers[i].questionID==questionID){
          console.log(i);
          return answers[i];
        }
      }
      console.log(-1);
      return -1;
  }

  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  delete() {

  this.passEntry.emit('O Enunciado vai ser apagado');

 }

 cancel() {
  this.modalService.dismissAll();
 }
}
