import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../service/backend-api.service';

@Component({
  selector: 'session-view',
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.css']
})
export class SessionViewComponent implements OnInit {
  arrayOfSessions: Object;

  constructor(private service: BackendApiService) { }

  ngOnInit() {
    this.getData()
  }
  getData(){
    this.service.get('getAllSessions').subscribe((Response)=>{
      this.arrayOfSessions= Response.body
    })
  }
  formatDateTime(dateTime): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    const formattedDateTime = new Date(dateTime).toLocaleString(undefined, options);
    return formattedDateTime;
  }

  joinSession(id:any){
    console.log(id)
  }
}
