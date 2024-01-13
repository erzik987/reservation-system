import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  content: string;
}

@Component({
  selector: 'app-universal-dialog',
  templateUrl: './universal-dialog.component.html',
  styleUrls: ['./universal-dialog.component.less']
})
export class UniversalDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
