import { Component, OnInit } from '@angular/core';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Examtable } from '../pojo/examtable';
import { ExamServiceService } from '../../exam-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddExamComponent } from '../add-exam/add-exam.component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  ELEMENT_DATA: Examtable[] = new Array();
  displayedColumns: string[] = ['srNo', 'exam_no', 'exam_name', 'exam_date', 'total_question', 'passing_marks', 'sub_name',/* 'option', 'add_question', */'flag','menu'];
  dataSource = new MatTableDataSource<Examtable>(this.ELEMENT_DATA);
  //@ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatPaginator, { static: true }) paginator: any;

  constructor(private examService: ExamServiceService, public dialog: MatDialog) { }
  ngOnInit() {
   this.fullAlldata();

  }
  fullAlldata(){
    this.examService.getData("exammaster").subscribe(data => { this.ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource<Examtable>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }
  openDialog(datasend): void {
    const dialogRef = this.dialog.open(AddExamComponent,{
      width: '500px',
      data: datasend
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fullAlldata();
    });
  }
  addExamData(){
    const dialogRefadd = this.dialog.open(AddExamComponent,{
      width: '500px'
    });
    dialogRefadd.afterClosed().subscribe(result => {
      this.fullAlldata();
    });
  }
  clickMethod(exam_no: number ) {
    if(confirm("Are you sure to delete ")) {
     this.examService.deleteData('exammaster/'+ exam_no).subscribe(res =>{
      alert('delete success');
      this.fullAlldata();
     })
        } else {
          alert(' you press no');
        }
    }
}
