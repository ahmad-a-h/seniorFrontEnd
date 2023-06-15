import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgxMatDatetimePickerModule, 
  NgxMatNativeDateModule, 
  NgxMatTimepickerModule 
} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MasterPageComponent } from './components/master-page/master-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { CreateSessionComponent } from './components/session-create/create-session.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CourseDetailsComponent } from './components/course-details/course-Details.component';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CourseViewComponent } from './components/course-view/course-view.component';
import { SessionsGroupComponent } from './components/sessions-nav-bar/nav-bar.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { SessionViewComponent } from './components/session-view/session-view.component';
import { JoinSessionComponent } from './components/join-session/join-session.component';
import { LoginComponent } from './components/login/login.component';
import { courseNavBarComponent } from './components/course-nav-bar/nav-bar.component';
import { CreateCourseComponent } from './components/course-create/create-course.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterPageComponent,
    SessionsGroupComponent,
    RegisterStudentComponent,
    CreateSessionComponent,
    CourseViewComponent,
    NavbarComponent,
    CourseViewComponent,
    CourseDetailsComponent,
    SessionViewComponent,
    JoinSessionComponent,
    LoginComponent,
    courseNavBarComponent,
    CreateCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule, 
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    MaterialFileInputModule,
    MatTableModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

