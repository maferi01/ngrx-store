import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-my-lib-display',
  template: `
    <p>
      my-lib-display works!
    </p>
  `,
  styles: [
  ]
})
export class MyLibDisplayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
