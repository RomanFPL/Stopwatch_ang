import { Component, OnInit } from '@angular/core';
import {interval} from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent implements OnInit {

  ngOnInit(): void { }

  clickInit: boolean = false;
  isWaited: boolean = false;
  started: boolean = false;
  currentTimeS: string = "00";
  currentTimeM: string = "00";
  caunter = interval(1000);
  stopwatch: any;
  cv: number = 0;
  previousValue: number = 0;


  initCounter = (n: number) => {
    this.stopwatch = this.caunter.subscribe(() => {
    n++;
    this.currentTimeS = (n%60<10) ? `0${n%60}` : `${n%60}`;
    this.currentTimeM = (n/60<10) ? `0${Math.floor(n/60)}` : `${Math.floor(n/60)}`;
    this.started = true;
    this.isWaited = false;
    })
  }

  resetCounter = () => {
    this.cv = 0;
    this.stopwatch.unsubscribe();
    this.currentTimeS = "00";
    this.currentTimeM = "00";
  }

  handleDobleClick = () => {
    if(this.clickInit){
      this.handleWait()
      this.isWaited = true;
    } else {
      this.clickInit = true;
      setTimeout(()=> {this.clickInit = false}, 500)
    }
  }


  handleStart = () => {
    if(this.isWaited || !this.started){
      this.initCounter(this.cv);
    } else {
      this.resetCounter();
      this.started = false;
      this.isWaited = false;
    }
    
  }

  handleWait = () => {
    if(this.started){
      this.stopwatch.unsubscribe();
    }
  }

  handleReset = () => {
      if(this.started){
        this.resetCounter();
        this.initCounter(this.cv);
    }
  }
}
