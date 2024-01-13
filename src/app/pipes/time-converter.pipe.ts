import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConverter'
})
export class TimeConverterPipe implements PipeTransform {
  transform(value?: number): string {
    if (!value || value === 0) {
      return '';
    }

    const newHours = Math.floor(value / 60);
    const newMinutes = value % 60;

    return `${newHours}:${newMinutes.toString().padStart(2, '0')}`;
  }
}
