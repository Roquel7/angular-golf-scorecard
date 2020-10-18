import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.css']
})
export class ScorecardComponent implements OnInit {

  outHole = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  inHole = [10, 11, 12, 13, 14, 15, 16, 17, 18];

  public courseOne = [];
  public courseTwo = [];
  public courseThree = [];


  constructor(
    private coursesService: CoursesService
    ) { }

  ngOnInit(): void {
    this.coursesService.getCourseOne()
    .subscribe(res => {
      console.log(res);
      this.courseOne = res.data;
    });

    this.coursesService.getCourseTwo()
    .subscribe(res => {
      console.log(res);
      this.courseTwo = res.data;
    });

    this.coursesService.getCourseThree()
    .subscribe(res => {
      console.log(res);
      this.courseThree = res.data;
    });
  }
}


