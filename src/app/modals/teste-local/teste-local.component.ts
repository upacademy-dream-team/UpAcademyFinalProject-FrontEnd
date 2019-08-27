import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { ReplaySubject, Subscription } from 'rxjs';
import { Test } from 'src/app/core/models/test';
import { TestServiceService } from 'src/app/core/services/test-service/test-service.service';

@Component({
  selector: 'app-teste-local',
  templateUrl: './teste-local.component.html',
  styleUrls: ['./teste-local.component.scss']
})
export class TesteLocalComponent implements OnInit, OnDestroy {
  public tests$: ReplaySubject<Test[]>;
  private subscriptionTests: Subscription;
  selectedTest: any = 'Enunciado';
  closeResult: string;
  currentRecruiter: string;
  recruiterEmail: string;
  @Input() messageTesteLocal;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    private testService: TestServiceService,
    private modalService: NgbModal,
    private userApi: UserServiceService,
  ) {
    this.tests$ = this.testService.tests$;
    this.subscriptionTests = this.tests$.subscribe((a) => console.log('tests$', JSON.stringify(a))); }

  ngOnInit() {
    this.testService.getAllTests();
  }

  ngOnDestroy() {
    this.subscriptionTests.unsubscribe();
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

  iniciarTesteLocal() {
    this.passEntry.emit('A password vai ser resetada');
    console.log(this.messageTesteLocal);
    this.modalService.dismissAll();
    this.saveCurrentTest();
    this.saveCurrentRecruiter();
    this.userApi.logout();
  }

  cancel() {
    this.modalService.dismissAll();
   }

   saveCurrentTest() {
     this.testService.setCurrentTest(this.selectedTest);
     }

    saveCurrentRecruiter() {
      this.currentRecruiter = this.userApi.getUserName();
      this.recruiterEmail = this.userApi.getUserEmail();
      this.testService.setCurrentRecruiter(this.currentRecruiter);
      this.testService.setRecruiterEmail(this.recruiterEmail);
    }
}
