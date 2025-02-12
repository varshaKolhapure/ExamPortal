import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/common/login/login.component';
import { HomeComponent } from './admin/controller/home/home.component';
import { ContactUsComponent } from './admin/controller/contact-us/contact-us.component';
import { ExamComponent } from './admin/controller/exam/exam.component';
import { SubjectListComponent } from './admin/controller/subject-list/subject-list.component';
import { ExamQuestionDetailsComponent } from './admin/controller/exam-question-details/exam-question-details.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },

  {
    path : 'home',
    component: HomeComponent
  },
  {
    path : 'exam',
    component: ExamComponent
  },
  {
    path : 'subject-list',
    component: SubjectListComponent
  },
  {
    path : 'question-details',
    component: ExamQuestionDetailsComponent
  },

  {
    path : 'contactUs',
    component: ContactUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
