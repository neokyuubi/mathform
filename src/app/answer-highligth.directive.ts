import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map } from 'rxjs';

@Directive({
  selector: '[appAnswerHighligth]'
})
export class AnswerHighligthDirective {

  constructor(private elm:ElementRef, private controlName:NgControl)
  {}

  ngOnInit()
  {
    console.log(this.controlName);
    
    this.controlName.control?.parent?.valueChanges.pipe(map((value)=>{
      const {a, b , answer} = value;
      return Math.abs((a + b - answer) / (a+b));
    })
    ).subscribe((value)=>{
      console.log(value);
      if (value < 0.3) 
      {
        this.elm.nativeElement.classList.add('close');
      }
      else
      {
        this.elm.nativeElement.classList.remove('close');
      }
    });
  }

}
