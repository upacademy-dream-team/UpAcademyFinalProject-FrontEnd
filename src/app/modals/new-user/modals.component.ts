import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User, UserServiceService } from '../../core';



@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})

export class ModalsComponent implements OnInit {

  closeResult: string;
  user = new User();
  msg: any;
  check: number;


  constructor(
    private modalService: NgbModal,
    private userApi: UserServiceService,
  ) {
    this.user.accessType = 'Recrutador';

  }

  ngOnInit() {
  }

  open(content: any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  save(user: User) {
    this.userApi.addUser(user).subscribe(
      data => {
        console.log(data);
        this.userApi.getAllUsers();
        this.modalService.dismissAll();
        this.user.email=null;
        this.user.username=null;
        this.check=0;
      },
      (error) => {
        console.log(error.error);
        this.msg = /*'Parâmetros de utilizador em falta.Verifique se todos os dados foram inseridos'*/
        error.error;
        this.check = 1 ;
      }
      );

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



}



