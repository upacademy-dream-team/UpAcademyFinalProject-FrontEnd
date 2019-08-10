import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserServiceService } from 'src/app/core';

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

  constructor(private userApi: UserServiceService) { }

  ngOnInit() {
  }

  clickRow(row) {
    this.clickedRow.emit(row);
  }

  onClickFas(id, event) {
    console.log(event.target.classList.value);
    console.log(id);
    //we should not be able to delete own user (to avoid an all-users delete)
    if(event.target.classList.value=="fas fa-trash")
      this.userApi.removeUser(id).subscribe(
        data => {
          console.log(data);
          this.userApi.getAllUsers();
        },
      );
      /*else if(event.target.classList.value=="fas fa-power-off")
        this.userApi.resetPassword(users[id]).subscribe(
        data => {
          console.log(data);
        },
      );*/
  }

}
