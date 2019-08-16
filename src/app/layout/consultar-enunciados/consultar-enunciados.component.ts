import { Component, OnInit, OnDestroy } from '@angular/core';
import { Test } from 'src/app/core/models/test';
import { ReplaySubject, Subscription } from 'rxjs';
import { TestServiceService } from 'src/app/core/services/test-service/test-service.service';

@Component({
  selector: 'app-consultar-enunciados',
  templateUrl: './consultar-enunciados.component.html',
  styleUrls: ['./consultar-enunciados.component.scss']
})
export class ConsultarEnunciadosComponent implements OnInit, OnDestroy {
  public tests$: ReplaySubject<Test[]>;
  private subscriptionTests: Subscription;

  constructor(
    private testService: TestServiceService
  ) {
    this.tests$ = this.testService.tests$;
    this.subscriptionTests = this.tests$.subscribe((a) => console.log('tests$', JSON.stringify(a)));
   }

  ngOnInit() {
    this.testService.getAllTests();
  }

  ngOnDestroy() {
    this.subscriptionTests.unsubscribe();
  }

}
