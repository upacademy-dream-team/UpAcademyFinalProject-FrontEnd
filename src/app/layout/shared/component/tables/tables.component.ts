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

  private current_id: number = this.userApi.getCurrentUser().id;

  ngOnInit() {
    console.log(this.current_id);
  }

  clickRow(row) {
    this.clickedRow.emit(row);
  }

  onClickFas(user, event) {
    console.log(event.target.classList.value);
    console.log(user["id"]);
    let id=user["id"];
    //we should not be able to delete own user (to avoid an all-users delete)
    if(event.target.classList.value=="fas fa-trash"){
      if(this.userApi.getCurrentUser().id==id)
        console.log("CANNOT DELETE OWN ACCOUNT");
      else{
        this.userApi.removeUser(id).subscribe(
          data => {
            console.log(data);
            this.userApi.getAllUsers();
          }
        );
      }
    }
    else if(event.target.classList.value=="fas fa-power-off")
      this.userApi.resetPassword(user).subscribe(
      data => {
        console.log(data);
      },
    );
  }

}
