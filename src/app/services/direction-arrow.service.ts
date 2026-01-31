import { Injectable, signal, WritableSignal } from '@angular/core';
import { DirectionArrowEnum } from '../enums/direction-arrow.enum';

@Injectable({
  providedIn: 'root',
})
export class DirectionArrowService {

  directionSignal: WritableSignal<DirectionArrowEnum | null> = signal(null);

  constructor() {
  }

  clear() {
    this.directionSignal.set(null);
  }
}
