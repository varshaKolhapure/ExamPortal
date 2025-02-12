import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamServiceService } from '../../exam-service.service';
import { subjecttable } from '../pojo/Subjecttable';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { subject } from '../pojo/subject';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
})
export class SubjectListComponent implements OnInit {
  ELEMENT_DATA: subject[] = new Array();
  subjectData = { sub_no: null, sub_name: null };
  checkEdit: string = 'submit';

  displayedColumns: string[] = ['srNo', 'sub_no', 'sub_name', 'option'];

  dataSource = new MatTableDataSource<subject>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: any;

  constructor(private examService: ExamServiceService) {}
  ngOnInit(): void {
    this.getMaxOfSubjectNo();
    // this.subjectData.sub_no = 10;
    // this.subjectData.sub_name = "daasdfasdf";
    this.getSubjectList();
  }
  getSubjectList() {
    this.examService.getData('subject').subscribe((data) => {
      this.ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource<subject>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  onSubmit() {
    alert('check list value = ' + this.checkEdit);
    if (this.checkEdit == 'update') {
      alert('data is edit so u requried to update api');
      this.examService
        .updateData('subject', this.subjectData)
        .subscribe((data) => {
          alert('updated successfully');
          this.getSubjectList();
          this.subjectData.sub_name = '';
          this.getMaxOfSubjectNo();
          this.checkEdit = 'submit';
        });
    } else {
      alert('data is insert so u requried to insert api');
      this.examService
        .insertData('subject', this.subjectData)
        .subscribe((data) => {
          this.getSubjectList();
          this.subjectData.sub_name = '';
          this.getMaxOfSubjectNo();
          this.checkEdit = 'submit';
        });
    }
    console.log('form submitted', this.subjectData);
  }

  getEditSubject(subject) {
    console.log(subject);
    this.subjectData.sub_no = subject.sub_no;
    this.subjectData.sub_name = subject.sub_name;
    this.checkEdit = 'update';
  }

  getMaxOfSubjectNo() {
    this.examService.getData('subject/max').subscribe((data) => {
      console.log(data);
      this.subjectData.sub_no = data;
    });
  }

  getDeleteSubject(sub_no: number) {
    if (confirm('Are you sure to delete this record....?')) {
      this.examService.deleteData('subject/' + sub_no).subscribe((data) => {
        this.getSubjectList();
        this.subjectData.sub_name = '';
        this.getMaxOfSubjectNo();
      });
    }
  }

  resetForm() {
    this.subjectData.sub_name = '';
    this.getMaxOfSubjectNo();
  }
}
