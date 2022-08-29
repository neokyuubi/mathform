import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MathValidators } from '../math-validators';
import { delay, filter, map, scan } from 'rxjs';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {

  secondPerSolution = 0;
  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber),
    b: new FormControl(this.randomNumber),
    answer: new FormControl("")
  },
  [MathValidators.addition('answer','a','b')]);

  constructor() { }

  get a():number
  {
    return this.mathForm.value.a;
  }

  get b():number
  {
    return this.mathForm.value.b;
  }

  get answer():number
  {
    console.log(this.a ,this.b , parseInt(this.mathForm.value.answer),this.a + this.b == this.mathForm.value.answer);
    
    return parseInt(this.mathForm.value.answer);
  }

  ngOnInit(): void 
  {
    this.mathForm.statusChanges.pipe(
      filter((value)=>
      {
        return value === 'VALID';
      }),
      delay(1000),
      scan( (acc) => {
        return {numberSolved:acc.numberSolved+1, startTime:acc.startTime};
      }, { numberSolved:0, startTime: new Date() })
    )
    .subscribe(({numberSolved, startTime}) =>
    {
      // if(value === 'INVALID')
      // {
      //   return;
      // }

      // this.mathForm.controls["a"].setValue(this.randomNumber);
      // this.mathForm.controls["b"].setValue(this.randomNumber);
      // this.mathForm.controls["answer"].setValue('');
      // numberSolved++; // replaced by scan()
      this.secondPerSolution = ( new Date().getTime() - startTime.getTime() ) / numberSolved / 1000;
      
      this.mathForm.setValue(
      {
        a:this.randomNumber,
        b:this.randomNumber,
        answer: '',
      }
      );
    })
  }

  get randomNumber()
  {
    return Math.floor(Math.random() * 10);
  }

}
