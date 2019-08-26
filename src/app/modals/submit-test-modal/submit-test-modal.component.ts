import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from 'src/app/core';

@Component({
  selector: 'app-submit-test-modal',
  templateUrl: './submit-test-modal.component.html',
  styleUrls: ['./submit-test-modal.component.scss']
})
export class SubmitTestModalComponent implements OnInit {

  closeResult: string;
  @Input()check: number;
  @Input() messageSubmitedTest;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private userApi: UserServiceService,
    ) {}

  ngOnInit() {
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

 submit() {

  this.passEntry.emit('Test Submited');

 }

 cancel() {
  this.modalService.dismissAll();
 }
}

