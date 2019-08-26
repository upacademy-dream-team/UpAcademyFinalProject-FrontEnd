import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { QuestionServiceService } from 'src/app/core/services/question-service/question-service.service';

@Component({
  selector: 'app-swap-questions',
  templateUrl: './swap-questions.component.html',
  styleUrls: ['./swap-questions.component.scss']
})
export class SwapQuestionsComponent implements OnInit {
  closeResult: string;
  @Input()check: number;
  @Input() messageMsg;
  @Input() messageDeleteTest;
  @Input() messageArray;
  @Input() category;
  @Input() allRandomQuestions;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  scroll(el: HTMLElement, checked:boolean) {
    if(checked)
      el.scrollIntoView({behavior: 'smooth'});
  }

  constructor(
    private modalService: NgbModal,
    private userApi: UserServiceService,
    private questionService: QuestionServiceService
    ) {}

  private questions;
  private checkArray=[];
  private randomQuestionIDs=[];

  ngOnInit() {
    this.questionService.getAllQuestionsOfCategory(this.category).subscribe(
      data=> {this.questions=data;
      for(let i=0;i<this.questions.length;i++)
        this.checkArray[i]=false;
      console.log(this.checkArray.length);
    }
      );
    console.log(this.category);
    for(let i=0; i<this.allRandomQuestions.length;i++)
          this.randomQuestionIDs.push(this.allRandomQuestions[i].id);
  }

  onChange(j: number,isChecked: boolean){
    if(isChecked){
      this.uncheckOthers(this.checkArray, j);
      this.checkArray[j]=true;
    }
    else
      this.checkArray[j]=false;
    console.log(this.checkArray);
    //console.log(this.randomQuestionIDs);
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
    //get question
    let index=this.checkArray.indexOf(true);
    if(index!=-1)
      this.passEntry.emit(this.questions[index]);
    else
      this.passEntry.emit(-1);
 }

 cancel() {
  this.modalService.dismissAll();
 }

   //this function is used so that one might use checkboxes as radio objects
   public uncheckOthers(checkArray, newCheckedIndex){
    let indexToUncheck;
    if(checkArray.indexOf(true)==newCheckedIndex)
      indexToUncheck=checkArray.lastIndexOf(true);
    else
      indexToUncheck=checkArray.indexOf(true);
    checkArray[indexToUncheck]=false;
  }

  public checkIfQuestionAlreadyInUse(question){
    if(this.randomQuestionIDs.indexOf(question.id)==-1)
      return false;
    return true;
  }


}
