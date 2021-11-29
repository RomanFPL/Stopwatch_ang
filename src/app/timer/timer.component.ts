import { Component, OnInit } from '@angular/core';
import {auditTime, buffer, debounceTime, delay, filter, fromEvent, interval, throttleTime, timeout} from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent implements OnInit {

  clickInit: boolean = false;
  isWaited: boolean = false;
  started: boolean = false;
  currentTimeS: string = "00";
  currentTimeM: string = "00";
  caunter = interval(1000);
  stopwatch: any;
  cv: number = 0;

  ngOnInit(): void { 
    const clicksOnWait$ = fromEvent(document.getElementById("wait-btn")!, 'click');
    clicksOnWait$
    .pipe(
      // Bugs occurred
      // buffer(clicks$.pipe(throttleTime(500))),
      // Emit first value then ignore for specified duration
      buffer(clicksOnWait$.pipe(auditTime(500))),
      filter(clickArray => clickArray.length > 1)
      )
      .subscribe((v) => {v.length == 2 && this.handleWait() 
      });
  }

  initCounter = () => {
    this.started = true;
    this.isWaited = false;
    this.stopwatch = this.caunter.subscribe(() => {
    this.cv++;
    this.currentTimeS = (this.cv%60<10) ? `0${this.cv%60}` : `${this.cv%60}`;
    this.currentTimeM = (this.cv/60<10) ? `0${Math.floor(this.cv/60)}` : `${Math.floor(this.cv/60)}`;
    })
  }

  resetCounter = () => {
    this.cv = 0;
    this.stopwatch.unsubscribe();
    this.currentTimeS = "00";
    this.currentTimeM = "00";
  }

  handleStart = () => {
    if(this.isWaited || !this.started){
      this.initCounter();
    } else {
      this.resetCounter();
      this.started = false;
      this.isWaited = false;
    }
    
  }

  handleWait = () => {
    if(this.started){
      this.stopwatch.unsubscribe();
      this.isWaited = true;
    }
  }

  handleReset = () => {
      if(this.started){
        this.resetCounter();
        this.initCounter();
    }
  }
}
