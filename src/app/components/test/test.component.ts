import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  sessionForm: FormGroup;
  constructor(private router:Router) { 
    this.sessionForm = new FormGroup({
      endDateTime:new FormControl(''),
    })
  }
  ngOnInit() {
  }

}
