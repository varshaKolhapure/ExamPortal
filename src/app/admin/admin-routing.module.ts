import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterTempletComponent } from './common/master-templet/master-templet.component';
import { DashBoardComponent } from './controller/dash-board/dash-board.component';
import { ExamComponent } from './controller/exam/exam.component';

const routes: Routes = [
  {
    path: '',
    component: MasterTempletComponent,
    children :  [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashBoardComponent },
      { path: 'exam', component: ExamComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
