import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { TestServiceService } from 'src/app/core/services/test-service/test-service.service';


@Component({
  selector: 'app-test-show-in-modal',
  templateUrl: './test-show-in-modal.component.html',
  styleUrls: ['./test-show-in-modal.component.scss']
})
export class TestShowInModalComponent implements OnInit {
  closeResult: string;
  public testRow = [];
  @Input()check: number;
  @Input() messageMsg;
  @Input() messageTestName;
  @Input() TestQuestions;
  @Input() TestAnswers;
  @Input() messageTestTotal;
  public myTest;

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private userApi: UserServiceService,
    private testService: TestServiceService,
    ) {}

  ngOnInit() {
    console.log(this.messageTestTotal.id);
    this.testService.getTestWithSolutions(this.messageTestTotal.id).subscribe(data=> {this.myTest=data; console.log(data)});
  }

  open(content: any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

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
