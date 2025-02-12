import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
public sessionDataShow: string = '';
  SetSession(){
    sessionStorage.setItem("exam_no",JSON.stringify({name: 'Datta', LastName:'asdfasdf'}))
  }
  GetSession(){
    this.sessionDataShow = sessionStorage.getItem("exam_no");
  }

}
