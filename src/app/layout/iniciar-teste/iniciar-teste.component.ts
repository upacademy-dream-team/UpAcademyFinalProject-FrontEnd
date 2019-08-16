import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TesteLocalComponent } from 'src/app/modals/teste-local/teste-local.component';
import { LinkGeradoComponent } from 'src/app/modals/link-gerado/link-gerado.component';
import { ReplaySubject, Subscription } from 'rxjs';
import { User } from 'src/app/core';
import { TestServiceService } from 'src/app/core/services/test-service/test-service.service';

@Component({
  selector: 'app-iniciar-teste',
  templateUrl: './iniciar-teste.component.html',
  styleUrls: ['./iniciar-teste.component.scss']
})
export class IniciarTesteComponent implements OnInit,OnDestroy {
  public tests$: ReplaySubject<User[]>;
  private subscriptionTests: Subscription;


  constructor(
    private testService: TestServiceService,
    private modalService: NgbModal,

  ) {}

  ngOnInit() {}

  ngOnDestroy() {}

  modalTesteLocal() {
    const modalRef = this.modalService.open(TesteLocalComponent);

    modalRef.componentInstance.messageTesteLocal = 'Gerado';
  }

  modalLinkGerado() {
    const modalRef = this.modalService.open(LinkGeradoComponent);

    modalRef.componentInstance.messageLinkGerado = 'Link Enviado';
  }
}
