import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';

@Component({
  selector: 'app-delete-resultado-candidato',
  templateUrl: './delete-resultado-candidato.component.html',
  styleUrls: ['./delete-resultado-candidato.component.scss']
})
export class DeleteResultadoCandidatoComponent implements OnInit {

  closeResult: string;
  @Input() messageDeleteResultadoCandidato;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private userApi: UserServiceService,
    ) {}

  ngOnInit() {
  }

  open(content: any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  delete() {

  this.passEntry.emit('O user vai ser apagado');

 }

 cancel() {
  this.modalService.dismissAll();
 }
}
