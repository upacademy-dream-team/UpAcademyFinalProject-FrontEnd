import { Component, OnInit, OnDestroy } from '@angular/core';
import { SolvedTest } from 'src/app/core/models/solvedTest';
import { ReplaySubject, Subscription } from 'rxjs';
import { SolvedTestServiceService } from 'src/app/core/services/solvedTest-service/solved-test-service.service';

@Component({
  selector: 'app-consultar-resultados',
  templateUrl: './consultar-resultados.component.html',
  styleUrls: ['./consultar-resultados.component.scss']
})
export class ConsultarResultadosComponent implements OnInit, OnDestroy {
  public solvedTests$: ReplaySubject<SolvedTest[]>;
  private subscriptionSolvedTests: Subscription;

  constructor(
    private solvedTestService: SolvedTestServiceService
  ) {
    this.solvedTests$ = this.solvedTestService.solvedTests$;
    this.subscriptionSolvedTests = this.solvedTests$.subscribe((a) => console.log('tests$', JSON.stringify(a)));
   }

  ngOnInit() {
    this.solvedTestService.getAllSolvedTests();
  }

  ngOnDestroy() {
    this.subscriptionSolvedTests.unsubscribe();
  }

}
