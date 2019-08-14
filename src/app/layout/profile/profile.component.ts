import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { Router } from '@angular/router';
import { AlteracaoPasswordComponent } from 'src/app/modals/alteracao-password/alteracao-password.component';
import { ChangePasswordAntigaComponent } from 'src/app/modals/change-password-antiga/change-password-antiga.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  accessType: string;
  name: string;
  email: string;
  ultimoLogin: string;



  constructor(
    private router: Router,
    private accountApi: UserServiceService,
    private modalService: NgbModal,
  ) {
    this.name = accountApi.getUserName();
    this.accessType = accountApi.getAccessType();
    this.email = accountApi.getemail();
    this.ultimoLogin = accountApi.getLastLogin();
  }

  ngOnInit() {
  }

  resetPassword(user) {

    const modalRef = this.modalService.open(ChangePasswordAntigaComponent);

    modalRef.componentInstance.messageChangePasswordAntiga = 'Deseja mesmo fazer reset da passoword deste utilizador?';

  }






}
