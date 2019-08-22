import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { ReplaySubject, Subscription, timer } from 'rxjs';
import { Test } from 'src/app/core/models/test';
import { TestServiceService } from 'src/app/core/services/test-service/test-service.service';
import { SessionServiceService } from 'src/app/core/services/session-service/session-service.service';


@Component({
  selector: 'app-link-gerado',
  templateUrl: './link-gerado.component.html',
  styleUrls: ['./link-gerado.component.scss']
})
export class LinkGeradoComponent implements OnInit, OnDestroy {
  public tests$: ReplaySubject<Test[]>;
  private subscriptionTests: Subscription;
  selectedTest: any = 'Enunciado';
  closeResult: string;
  @Input() messageLinkGerado;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  testeDetails = {recruiterEmail: null, numberOfHours: 1};
  private linkGenerated: boolean;
  private linkId: any;
  private timer: number;


  constructor(
    private modalService: NgbModal,
    private testService: TestServiceService,
    private userApi: UserServiceService,
    private sessionService: SessionServiceService
  ) { 
    this.tests$ = this.testService.tests$;
    this.subscriptionTests = this.tests$.subscribe((a) => console.log('tests$', JSON.stringify(a))); 
  }

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

  generateLink() {
    this.testeDetails.numberOfHours = this.timer;
    this.testeDetails.recruiterEmail = this.userApi.getemail();
    this.sessionService.addSession(this.testeDetails, this.selectedTest).subscribe(
      data => this.linkId = data , error => console.log(error.error),);
    this.linkGenerated = true;

  }

  sendTest() { 
    // this.passEntry.emit('A password vai ser resetada');
    // console.log(this.messageLinkGerado);
    this.modalService.dismissAll();
  }

  cancel() {
    this.modalService.dismissAll();
  }

}
