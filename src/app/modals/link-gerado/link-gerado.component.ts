import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { ReplaySubject, Subscription, timer } from 'rxjs';
import { Test } from 'src/app/core/models/test';
import { TestServiceService } from 'src/app/core/services/test-service/test-service.service';
import { SessionServiceService } from 'src/app/core/services/session-service/session-service.service';
import { SessionAdd } from 'src/app/core/models/sessionAdd';
import { EmailServiceService } from 'src/app/core/services/email-service/email-service.service';
import { Email } from 'src/app/core/models/email';


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
  //testeDetails = {recruiterEmail: null, numberOfHours: 1};
  testeDetails = new SessionAdd(); 
  private linkGenerated: boolean;
  private linkId: any;
  private timer: number;
  private candidateEmail: string;
  private button=false;


  constructor(
    private modalService: NgbModal,
    private testService: TestServiceService,
    private emailService: EmailServiceService,
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

  print(){
    console.log(this.candidateEmail);
  }

  generateLink() {
    this.testeDetails.numberOfDays = this.timer;
    this.testeDetails.recruiterEmail = this.userApi.getemail();
    this.testeDetails.candidateEmail = this.candidateEmail;
    this.sessionService.addSession(this.testeDetails, this.selectedTest).subscribe(
      data => {
        this.linkId = data;
        let messageLink="http://localhost:4200/generatedTestPage/"+this.linkId;
        let email=new Email();
        email.body="<p>Aceda ao seguinte link para começar o teste</p><br>"+messageLink;
        email.emailTo=this.candidateEmail;
        email.subject="Teste da Aubay";
        this.emailService.sendEmail(email).subscribe(data=>console.log(data), error=>console.log(error.error));
      }, 
      error => console.log(error.error),);
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
