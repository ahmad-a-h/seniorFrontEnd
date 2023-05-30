import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/service/http/backend-api.service';
import { Observable, interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'session-view',
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.css']
})
export class SessionViewComponent implements OnInit {
  arrayOfSessions: Object;

  constructor(private service: BackendApiService,private router: Router) { }

  ngOnInit() {
    this.getData()

  }
  passArrayOfSessionsTimings(arrayOfSessions){
    
    arrayOfSessions.forEach(element => {
      var delimiter = "T";
      var splittedString = element.startDateTime.split(delimiter);
      var startDate = splittedString.join(" ");
      var splittedString = element.endDateTime.split(delimiter);
      var endDate = splittedString.join(" ");
      this.checkTargetDateTime(new Date(startDate), new Date(endDate)).subscribe(value => {
        // console.log('Result:', value);
        element.isSessionActive = value
      });
  });
    
  }
  checkTargetDateTime(startDateTime, endDateTime) {
    return new Observable(observer => {
      let intervalId;
      
      const checkDateTime = () => {
        const currentDateTime = new Date();
        // console.log('Current time:', currentDateTime);
        if (currentDateTime >= startDateTime && currentDateTime <= endDateTime) {
          observer.next(true);
          // console.log('true');
        } else if (currentDateTime > endDateTime) {
          observer.next(false);
          // console.log('end');
          observer.complete();
          clearInterval(intervalId);
        }
      };
      
      if (startDateTime <= endDateTime) {
        checkDateTime();
        
        if (startDateTime <= new Date() && new Date() <= endDateTime) {
          observer.complete();
          // console.log('Complete');
        } else {
          intervalId = setInterval(checkDateTime, 1000);
        }
      } else {
        // console.log('Invalid date range');
        observer.complete();
      }
    
      return () => {
        clearInterval(intervalId);
      };
    });
  }
  
  
  
  

  getData(){
    this.service.get('getAllSessions').subscribe((Response)=>{
      this.arrayOfSessions= Response.body
      this.passArrayOfSessionsTimings(this.arrayOfSessions)
      
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

  joinSession(item:any){
    if(item.isSessionActive) {
      this.router.navigate(["JoinSession"]);
      this.service.setData(item)
      // console.log('rooute')
  }
    }
}
