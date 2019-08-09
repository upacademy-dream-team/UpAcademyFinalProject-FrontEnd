import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { ReplaySubject, Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-setting',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  public users$: ReplaySubject<User[]>;
  private subscriptionUsers: Subscription;
  public iconArray: string[];
 
  constructor(
    private userService: UserServiceService
    ) {
      this.users$ = this.userService.users$;
      this.subscriptionUsers = this.users$.subscribe((a) => console.log('users$', JSON.stringify(a)));
      this.iconArray = ['fas fa-trash', 'fas fa-power-off'];
    }

  ngOnInit() {
    this.userService.getAllUsers();
  }

  ngOnDestroy(){
    this.subscriptionUsers.unsubscribe();
  }


  
}
