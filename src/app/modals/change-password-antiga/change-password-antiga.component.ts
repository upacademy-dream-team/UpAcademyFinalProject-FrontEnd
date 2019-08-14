import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';

@Component({
  selector: 'app-change-password-antiga',
  templateUrl: './change-password-antiga.component.html',
  styleUrls: ['./change-password-antiga.component.scss']
})
export class ChangePasswordAntigaComponent implements OnInit {
  closeResult: string;
  @Input() messageChangePasswordAntiga;
  @Input() messageError;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  public newPassword;
  public newPassword2;
  public passwordAntiga;
  public check: number;

  constructor(
    private modalService: NgbModal,
    private userApi: UserServiceService,
  ) { }

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

  resetPasswordAntiga() {
    if (this.newPassword === this.newPassword2) {

      this.userApi.updaterPassword(this.userApi.getUserName(), this.passwordAntiga, this.newPassword).subscribe(
        data => {
          console.log(data);
          this.modalService.dismissAll();
        },
        (error) => {
          console.log(error.error);
          this.check = 2;
        }
      );



    } else {
      this.check = 1 ;
    }
  }

  cancel() {
    this.modalService.dismissAll();
   }

  public checkReset() {
    this.check = 0;
  }

}
