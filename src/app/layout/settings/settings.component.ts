import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';

@Component({
  selector: 'app-setting',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  users:Object;
  constructor(private data: UserServiceService) { }

  ngOnInit() {
    this.data.getAllUsers().subscribe(data =>{
      this.users = data;
      console.log(this.users);
    })
  }

  ngOnDestroy(){
  }

}
