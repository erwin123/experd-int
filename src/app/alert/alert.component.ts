import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  messageTitle: string;
  messageBody: string;
  public open: boolean = false;

  @Output() confirmOutput = new EventEmitter();

  confirm: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  public openMessageBox(title: string, message: string) {
    this.messageTitle = title;
    this.messageBody = message;
    this.open = true;
  }

  confirmationChoosen(answer:boolean) {
    this.confirmOutput.emit(answer);
  }

  public openConfirm(title: string, message: string, confirm: boolean) {
    this.messageTitle = title;
    this.messageBody = message;
    this.open = true;
    this.confirm = true;
  }
}
