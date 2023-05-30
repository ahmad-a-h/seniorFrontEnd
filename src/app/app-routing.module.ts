import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterPageComponent } from './components/master-page/master-page.component';
import { CourseDetailsComponent } from './components/course-details/course-Details.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { CourseViewComponent } from './components/course-view/course-view.component';
import { SessionsGroupComponent } from './components/sessions-nav-bar/nav-bar.component';
import { JoinSessionComponent } from './components/join-session/join-session.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: "", component: MasterPageComponent },
  { path: "login", component: LoginComponent },
  { path: "session", component: SessionsGroupComponent },
  { path: "student", component: RegisterStudentComponent },
  { path: "course", component: CourseViewComponent },
  { path: "courseDetails", component: CourseDetailsComponent },
  { path: "JoinSession", component: JoinSessionComponent },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
