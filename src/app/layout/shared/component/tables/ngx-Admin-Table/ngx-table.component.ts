import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UserServiceService } from 'src/app/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationComponent } from 'src/app';
import { AlteracaoPasswordComponent } from 'src/app/modals/alteracao-password/alteracao-password.component';


@Component({
  selector: 'app-ngx-table',
  templateUrl: './ngx-table.component.html',
  styleUrls: ['./ngx-table.component.scss']
})
export class NgxTableComponent implements OnInit {

  @Input() rows: any;
  @Input() columns: any;
  @Input() temp: any;
  @Output() clickedRow = new EventEmitter();
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(
    private userApi: UserServiceService,
    private modalService: NgbModal) {
  }


  ngOnInit() {
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter( function (d) {
      return d.username.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
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
    } else if (event.target.classList.value === 'fas fa-undo-alt fa-stack-2x ') {

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
