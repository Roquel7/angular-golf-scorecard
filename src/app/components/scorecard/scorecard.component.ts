import { Player } from './../../model/player';
import { Course } from './../../model/course';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.css']
})
export class ScorecardComponent implements OnInit {

  players: Player[] = [];
  playerId = 0;

  outHole = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  inHole = [10, 11, 12, 13, 14, 15, 16, 17, 18];

  courseOne = [];
  courseTwo = [];
  courseThree = [];

  playerFC = new FormControl('', this.nameValidator());


  constructor(
    private coursesService: CoursesService
    ) { }

  ngOnInit(): void {
    this.coursesService.getCourseOne()
    .subscribe(res => {
      console.log(res);
      this.courseOne = res;
    });


    // this.coursesService.getCourseTwo()
    // .subscribe(res => {
    //   console.log(res);
    //   this.courseTwo = res;
    // });

    // this.coursesService.getCourseThree()
    // .subscribe(res => {
    //   console.log(res);
    //   this.courseThree = res;
    // });
  }

  addPlayer(): void {
    if (this.playerFC.value) {
      this.playerId++;

      this.players.push({
        name: this.playerFC.value,
        id: this.playerId.toString()
      });
    }
  }

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let error = null;
      if (this.players && this.players.length) {
        this.players.forEach(player => {
          if (player.name.toLowerCase() === control.value.toLowerCase()) {
            error = {duplicate: true};
          }
        });
      }
      return error;
    };
  }
}


