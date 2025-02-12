import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ExamComponent } from './controller/exam/exam.component';
import { MaterialModule } from './common/material/material.module';
import { DashBoardComponent } from './controller/dash-board/dash-board.component';
import { AddExamComponent } from './controller/add-exam/add-exam.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactUsComponent } from './controller/contact-us/contact-us.component';
import { SubjectListComponent } from './controller/subject-list/subject-list.component';
import { ExamQuestionDetailsComponent } from './controller/exam-question-details/exam-question-details.component';
import { AddQuestionComponent } from './controller/add-question/add-question.component';


@NgModule({
  declarations: [
    DashBoardComponent,
    ExamComponent,
    AddExamComponent,
    ContactUsComponent,
    SubjectListComponent,
    ExamQuestionDetailsComponent,
    AddQuestionComponent
   ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
