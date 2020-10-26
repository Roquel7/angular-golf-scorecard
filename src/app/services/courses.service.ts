import { Course } from './../model/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    public http: HttpClient
  ) { }

  getCourseOne() {
    const url = `https://golf-courses-api.herokuapp.com/courses/18300`;
    return this.http.get(url).pipe(
      map(data => data[`data`]),
    );
  }

  getCourseTwo() {
    const url = 'https://golf-courses-api.herokuapp.com/courses/11819';
    return this.http.get(url).pipe(
      map(data => data[`data`])
    );
  }

  getCourseThree() {
      const url = 'https://golf-courses-api.herokuapp.com/courses/19002';
      return this.http.get(url).pipe(
        map(data => data[`data`])
      );
  }

}
