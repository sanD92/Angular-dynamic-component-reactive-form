import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-component',
  templateUrl: './message-component.component.html',
  styleUrls: ['./message-component.component.scss']
})
export class MessageComponentComponent implements OnInit {

  @Input() msg: string = "Default msg from message component";

  constructor() { }

  ngOnInit(): void {
    console.log('ngOnInit MessageComponentComponent calling')
  }

}
