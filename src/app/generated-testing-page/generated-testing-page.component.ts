import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionServiceService } from '../core/services/session-service/session-service.service';

@Component({
  selector: 'app-generated-testing-page',
  templateUrl: './generated-testing-page.component.html',
  styleUrls: ['./generated-testing-page.component.scss']
})
export class GeneratedTestingPageComponent implements OnInit, OnDestroy {
  session: any;

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionServiceService ) {
      this.route.params.subscribe(
        params => {
        this.sessionService.getSession(Number(params.id)).subscribe(data => { this.session = data;console.log(data); })
        });

     }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
