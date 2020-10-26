import {  ToastrService } from 'ngx-toastr';
import { NotificationComponent } from './../notification/notification.component';
import { PlayerService } from './../../services/player.service';
import { Player } from './../../model/player';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.css']
})
export class ScorecardComponent implements OnInit {

  players: Player[] = [];
  playerId = 0;

  outHole: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  inHole: string[] = ['10', '11', '12', '13', '14', '15', '16', '17', '18'];

  positions = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];

  test =  [1, 2, 3, 4, 5, 6, 7, 8, 9];

  courseOne = [];
  courseOneOutHole = [];
  courseOneInHole = [];
  courseOneOutPar = [];
  courseOneInPar = [];
  courseOneYardTotal: any;
  yardOut: any;
  yardIn: any;
  totalYard: any;


  courseTwo = [];
  courseTwoOutHole = [];
  courseTwoInHole = [];
  courseTwoYardTotal: any;
  secondYardOut: any;
  secondYardIn: any;
  totalSecondYard: any;


  courseThree = [];
  courseThreeOutHole = [];
  courseThreeInHole = [];
  courseThreeYardTotal: any;
  thirdYardOut: any;
  thirdYardIn: any;
  totalThirdYard: any;


  playerFC = new FormControl('', this.nameValidator());


  constructor(
    private coursesService: CoursesService,
    private playerService: PlayerService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {

    this.coursesService.getCourseOne()
    .subscribe(res => {
      this.courseOne = res.name;

      this.courseOneYardTotal = res.holes;

      this.yardOut = this.courseOneYardTotal.filter(val => val.hole <= 9).reduce(function(acc, hole) {return acc + hole.teeBoxes[2].yards}, 0);
      for (let i = 0; i <= 8; i++) {
        this.courseOneOutHole.push(res.holes[i].teeBoxes[2].yards);
        this.courseOneOutPar.push(res.holes[i].teeBoxes[2].par);
      }

      this.yardIn = this.courseOneYardTotal.filter(val => val.hole >= 10).reduce(function(acc, hole) {return acc + hole.teeBoxes[2].yards}, 0);
      for (let i = 9; i <= 17; i++) {
        this.courseOneInHole.push(res.holes[i].teeBoxes[2].yards);
        this.courseOneInPar.push(res.holes[i].teeBoxes[2].par);
      }

      this.totalYard = this.yardOut + this.yardIn;
    });

    this.coursesService.getCourseTwo()
    .subscribe(res => {

      this.courseTwo = res.name;

      this.courseTwoYardTotal = res.holes;

      this.secondYardOut = this.courseTwoYardTotal.filter(val => val.hole <= 9).reduce(function(acc, hole) {return acc + hole.teeBoxes[2].yards}, 0);
      for (let i = 0; i <= 8; i++) {
        this.courseTwoOutHole.push(res.holes[i].teeBoxes[2].yards);
      }

      this.secondYardIn = this.courseTwoYardTotal.filter(val => val.hole >= 10).reduce(function(acc, hole) {return acc + hole.teeBoxes[2].yards}, 0);
      for (let i = 9; i <= 17; i++) {
        this.courseTwoInHole.push(res.holes[i].teeBoxes[2].yards);
      }

      this.totalSecondYard = this.secondYardOut + this.secondYardIn;

    });

    this.coursesService.getCourseThree()
    .subscribe(res => {
      this.courseThree = res.name;

      this.courseThreeYardTotal = res.holes;

      this.thirdYardOut = this.courseThreeYardTotal.filter(val => val.hole <= 9).reduce(function(acc, hole) {return acc + hole.teeBoxes[2].yards}, 0);
      for (let i = 0; i <= 8; i++) {
        this.courseThreeOutHole.push(res.holes[i].teeBoxes[1].yards);
      }

      this.thirdYardIn = this.courseThreeYardTotal.filter(val => val.hole >= 10).reduce(function(acc, hole) {return acc + hole.teeBoxes[2].yards}, 0);
      for (let i = 9; i <= 17; i++) {
        this.courseThreeInHole.push(res.holes[i].teeBoxes[1].yards);
      }

      this.totalThirdYard = this.thirdYardOut + this.thirdYardIn;
    });



    this.playerService.getPlayerHours().subscribe(players => {
      this.players = players;
    });
  }

  addPlayer(): void {
    if (this.playerFC.value) {
      this.playerId++;

      this.players.push({
        name: this.playerFC.value,
        // id: this.playerId.toString(),
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0
      });
      this.playerFC.setValue('');
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

  getOutTotal(player: Player): number {
    return player[1] + player[2] + player[3] + player[4] + player[5] + player[6] + player[7] + player[8] + player[9];
  }

  getInTotal(player: Player): number {
    return player[10] + player[11] + player[12] + player[13] + player[14] + player[15] + player[16] + player[17] + player[18];
  }

  getTotal(player: Player): number {
    return player[1] + player[2] + player[3] + player[4] + player[5] +
    player[6] + player[7] + player[8] + player[9] + player[10] + player[11] +
    player[12] + player[13] + player[14] + player[15] + player[16] + player[17] + player[18];
  }

  removePlayer(player: Player, index: number): void {
    if (player.id) {
      this.playerService.deletePlayer(player);
    }
    this.players.splice(index, 1);
    this.toastr.error('Player Deleted');

  }

  submit(): void {
    this.players.forEach(player => {
      if(player.id) {
        this.playerService.updatePlayerScore(player);
        this.toastr.info('Player Score Has Been Updated!');
      } else {
        this.playerService.savePlayerScore(player);
        this.toastr.success('Player Scores Saved!');
      }
    });
  }

}


