import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamServiceService } from '../../exam-service.service';
import { question } from '../pojo/question';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionComponent } from '../add-question/add-question.component';

@Component({
  selector: 'app-exam-question-details',
  templateUrl: './exam-question-details.component.html',
  styleUrls: ['./exam-question-details.component.css'],
})
export class ExamQuestionDetailsComponent implements OnInit {
  ELEMENT_DATA: question[] = new Array();
  displayedColumns: string[] = [
    'sr_no',
    'exam_no',
    'question_no',
    'question',
    'option1',
    'option2',
    'option3',
    'option4',
    'right_ans',
    'marks',
    'options',
  ];

  dataSource = new MatTableDataSource<question>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: any;
  constructor(
    private examService: ExamServiceService,
    private _dialog: MatDialog
  ) {}
  ngOnInit(): void {}
  addQuestion() {}
  getAllQuestionsList() {}

  openAddEditQueForm() {
    const dialogRef = this._dialog.open(AddQuestionComponent, {
      width: '500px',
      data: null,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

 }
