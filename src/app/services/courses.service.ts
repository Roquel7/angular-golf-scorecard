import { Course } from './../model/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private http: HttpClient
  ) { }

  getCourseOne(): Observable<Course[]>{
    return this.http.get<Course[]>('https://golf-courses-api.herokuapp.com/courses/18300');
  }

  getCourseTwo(){
    return this.http.get<Course[]>('https://golf-courses-api.herokuapp.com/courses/11819');
  }

  getCourseThree(){
    return this.http.get<Course[]>('https://golf-courses-api.herokuapp.com/courses/19002');
  }

}
