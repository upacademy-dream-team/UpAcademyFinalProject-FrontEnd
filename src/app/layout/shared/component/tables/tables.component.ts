import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserServiceService } from 'src/app/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationComponent } from 'src/app/modals/delete-confirmation/delete-confirmation.component';
import { AlteracaoPasswordComponent } from 'src/app/modals/alteracao-password/alteracao-password.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  @Input() header: any;
  @Input() data$: any;
  @Input() labels: any;
  @Input() icons: any;
  @Output() clickedRow = new EventEmitter();

  constructor(
    private userApi: UserServiceService,
    private modalService: NgbModal,
  ) { }

  // tslint:disable-next-line: variable-name
  private current_id: number = this.userApi.getCurrentUser().id;

  ngOnInit() {
    console.log(this.current_id);
  }

  clickRow(row) {
    this.clickedRow.emit(row);
  }

  onClickFas(user, event) {

    console.log(event.target.classList.value);
    console.log(user);
    console.log(user['id']);
    const id = user['id'];

    // we should not be able to delete own user (to avoid an all-users delete)

    if (event.target.classList.value === 'fas fa-trash fa-lg') {
      if (this.userApi.getCurrentUser().id === id) {
        console.log('CANNOT DELETE OWN ACCOUNT');
      } else {

        console.log(id);

        const modalRef = this.modalService.open(DeleteConfirmationComponent);

        modalRef.componentInstance.messageDelete = 'Deseja mesmo apagar este utilizador?';

        modalRef.componentInstance.userToDelete = id;

        modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {

          this.userApi.removeUser(id).subscribe(
            data => {
              console.log(data);
              this.userApi.getAllUsers();
            }
          );
          this.modalService.dismissAll();
        });
      }
    } else if (event.target.classList.value === 'fas fa-power-off fa-lg') {

      const modalRef = this.modalService.open(AlteracaoPasswordComponent);

      modalRef.componentInstance.messagePassword = 'Deseja mesmo fazer reset da passoword deste utilizador?';

      modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {

        this.userApi.resetPassword(user).subscribe(
          data => {
            console.log(data);
          },
        );
        this.modalService.dismissAll();
      });
    }
  }
}
