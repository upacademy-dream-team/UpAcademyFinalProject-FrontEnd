import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { TesteLocalComponent } from 'src/app/modals/teste-local/teste-local.component';
import { LinkGeradoComponent } from 'src/app/modals/link-gerado/link-gerado.component';

@Component({
  selector: 'app-iniciar-teste',
  templateUrl: './iniciar-teste.component.html',
  styleUrls: ['./iniciar-teste.component.scss']
})
export class IniciarTesteComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private userApi: UserServiceService,
  ) { }

  ngOnInit() {
  }

  modalTesteLocal() {
    const modalRef = this.modalService.open(TesteLocalComponent);

    modalRef.componentInstance.messageTesteLocal = 'Gerado';
  }

  modalLinkGerado() {
    const modalRef = this.modalService.open(LinkGeradoComponent);

    modalRef.componentInstance.messageLinkGerado = 'Link Enviado';
  }
}
