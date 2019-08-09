import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User, UserServiceService } from '../core';


@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})

export class ModalsComponent implements OnInit {

  closeResult: string;
  user = new User();


  constructor(
    private modalService: NgbModal,
    private userApi: UserServiceService,
    ) {
    this.user.accessType = 'Recrutador';

  }

  ngOnInit() {
  }

  open( content: any ) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  save(user: User) {
    this.userApi.addUser(user).subscribe(data => {console.log(data); }, error => console.log(error));
  }

  private getDismissReason( reason: any ): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }

  }



}



