import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { exam } from '../pojo/exam';
import { ExamServiceService } from '../../exam-service.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css'],

})
export class AddExamComponent implements OnInit {
  public addExamForm!: FormGroup;
  public subjectList: any =[];
  public maxId: number;
  constructor(private service:ExamServiceService ,
    private FB : FormBuilder,
     public dialog: MatDialog,
     public dialogRef: MatDialogRef<AddExamComponent>,
      @Inject(MAT_DIALOG_DATA) public data: exam) {

  }

  ngOnInit(): void {
    this.createForm();
    this.service.getData('exammaster/max').subscribe(res =>{
      this.maxId = res;
      this.createForm();
    });
    this.service.getData('subject').subscribe(res =>{
      this.subjectList = res;
    });
   //console.log(this.data);

  }
  createForm(){
    this.addExamForm = this.FB.group(
      {
        exam_no : [ (this.data) ? this.data?.exam_no : this.maxId, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        exam_name : [this.data?.exam_name, [Validators.required,  Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*'), Validators.min(2), Validators.max(100)]],
        exam_date : [ this.data?.exam_date, [Validators.required]],
        total_question : [this.data?.total_question, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        passing_marks : [this.data?.passing_marks, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        sub_no : [this.data?.sub_no, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      }
    );
  }
  // get f(): { [key: string]: AbstractControl } {
  //   return this.addExamForm.controls;
  // }
  saveExamDetails(){
    if(this.data?.exam_name){
      this.service.updateData('exammaster',this.addExamForm.value ).subscribe(res=>{
        this.dialog.closeAll();
      });
    } else {
      this.service.insertData('exammaster',this.addExamForm.value ).subscribe(res=>{
        this.dialog.closeAll();
      });
    }
    //console.log(this.addExamForm);
  }
  delete(element)
  {
   alert(element);
   this.service.deleteData('exammaster/'+ element ).subscribe(res=>{
    this.dialog.closeAll();
  });
}
}
