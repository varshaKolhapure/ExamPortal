import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { question } from '../pojo/question';
import { ExamServiceService } from '../../exam-service.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  ELEMENT_DATA: question[] = new Array();
  formAddQuestion!: FormGroup;
  maxId: number;
  maxExam: number;
  maxQuestionId: number;
  service: any;


  constructor(
    private examService: ExamServiceService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddQuestionComponent>, // runtime componat calling refere its own class
    @Inject(MAT_DIALOG_DATA) public data: question
  ) {}
  ngOnInit(): void {
    let showData = JSON.parse(localStorage.getItem('questionList'));
    //console.log(showData);
    this.createAddQuestion();
    this.examService.getData('exam_question_details/max').subscribe((res) => {
      this.maxId = res;
      this.createAddQuestion();
    });
  }

  createAddQuestion() {
    this.formAddQuestion = this.fb.group({
      sr_no: [
        this.data ? this.data?.sr_no : this.maxId, //
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      exam_no: [
        this.data ? this.data?.exam_no : this.maxExam,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      question_no: [
        this.data ? this.data?.question_no : this.maxQuestionId,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      question: [this.data?.question, [Validators.required]],
      option1: [this.data?.option1, [Validators.required]],
      option2: [this.data?.option2, [Validators.required]],
      option3: [this.data?.option3, [Validators.required]],
      option4: [this.data?.option4, [Validators.required]],
      right_Ans: [this.data?.right_Ans, [Validators.required]], ////////for option ///////////////////////
      marks: [
        this.data?.marks,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
    });
  }
  addDataToSessionStorage() {
    let questionList = localStorage.getItem('questionList');
    if (questionList) {
      let GetList = JSON.parse(sessionStorage.getItem('questionList'));
      GetList.push(this.formAddQuestion.value);
      sessionStorage.setItem('questionList', JSON.stringify(GetList));
      // let questionListData = [GetList,...[this.formAddQuestion.value]];
      // localStorage.setItem('questionList',JSON.stringify(questionListData));
      let showData = JSON.parse(sessionStorage.getItem('questionList'));
    } else {
      sessionStorage.setItem(
        'questionList',
        JSON.stringify([this.formAddQuestion.value])
      );
    }
    this.saveQuestionDetails();
  }

  //Flag update master table as filling

  updateExamMaster(exam_no: number) {
    this.examService.getData('exammaster/' + exam_no).subscribe((res) => {
      console.log(res);
      res.flag = 'Filling'; // change only one colunm

      if (this.maxQuestionId == res.total_question) {
        res.flag = 'Filled';
      }
      this.examService.updateData('exammaster', res).subscribe((res) => {
        console.log('update to Filling');
      });
    });
  }

  saveQuestionDetails() {
    console.log(this.formAddQuestion.value);
    this.examService
      .insertData('exam_question_details', this.formAddQuestion.value)
      .subscribe((res) => {
        this.dialog.closeAll();
      });

    this.updateExamMaster(this.maxExam);
  }
  getMaxQuestion(exam) {
    console.log('exam');
    let checkAddQuestionLimit: number = 0;
    this.maxExam = exam.target.value;

    //check if exam no eneter
    if (exam.target.value) {
      //get maximum number to add new question
      this.examService
        .getData('exam_question_details/max/' + exam.target.value)
        .subscribe((res) => {
          console.log('second');
          this.maxQuestionId = res;
          this.createAddQuestion();
        });

      // get the max question added limit
      this.examService
        .getData('exammaster/' + exam.target.value)
        .subscribe((res) => {
          checkAddQuestionLimit = res.total_question;
          if (this.maxQuestionId > checkAddQuestionLimit) {
            alert(
              'You are not allow to add Question. This exam allowed only ' +
                checkAddQuestionLimit +
                ' question.'
            );
            this.maxQuestionId = null;
            this.maxExam = null;
            this.createAddQuestion();
          }
        });
    }
  }
  //for option///////////////////////////////////
  onSubjectChange(event) {
    let formValue = this.formAddQuestion.value;
    console.log(this.formAddQuestion.get('option' + event.target.value).value);
    this.formAddQuestion
      .get('right_Ans')
      .patchValue(
        this.formAddQuestion.get('option' + event.target.value).value
      );
  }

  getQuestions() {}
}
