import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ReplaySubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryServiceService } from 'src/app/core/services/category-service/category-service.service';
import { DeleteCategoryComponent } from 'src/app/modals/delete-category/delete-category.component';

@Component({
  selector: 'app-ngx-categories-table',
  templateUrl: './ngx-categories-table.component.html',
  styleUrls: ['./ngx-categories-table.component.scss']
})
export class NgxCategoriesTableComponent implements OnInit {
  public id;
  msg: any;
  check: number;
  public tests$: ReplaySubject<any[]> = new ReplaySubject(1);
  @Input() rows: any;
  @Input() columns: any;
  @Input() temp: any;
  @Output() clickedRow = new EventEmitter();
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(
    private userApi: CategoryServiceService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  clickRow(row) {
    this.clickedRow.emit(row);
  }

  onActivate(event) {
    if (event.type === 'click') {
      console.log(event.row);
    }
  }

  onClickFas(row, event) {

    this.id = row.category.id;

    console.log(this.id);

    if (event.target.classList.value === 'fas fa-trash fa-lg') {

      const modalRef = this.modalService.open(DeleteCategoryComponent);

      modalRef.componentInstance.messageDeleteTeste = 'Deseja mesmo apagar esta Categoria?';

      modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {

        this.userApi.removeCategory(this.id).subscribe(
          data => {
            console.log(data);
            this.userApi.getAllCategories();
            this.modalService.dismissAll();
          } , (error) => {
            console.log(error.error);
            this.msg = /*'Parâmetros de utilizador em falta.Verifique se todos os dados foram inseridos'*/
            error.error;
            this.check = 1 ;
            modalRef.componentInstance.messageMsg = 'Existem perguntas relacionadas com esta Categoria!';
            modalRef.componentInstance.check = this.check;
            console.log(this.check);
            console.log(this.msg);

          }
        );
      });
    }
  }
  

}


