import { Component, HostListener } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DirectionArrowService } from '../../services/direction-arrow.service';
import { DirectionArrowEnum } from '../../enums/direction-arrow.enum';

@Component({
  selector: 'app-direction-arrows',
  imports: [
    MatIcon
  ],
  templateUrl: './direction-arrows.html',
  styleUrl: './direction-arrows.scss',
})
export class DirectionArrows {

  @HostListener('window:keyup.arrowup')
  onArrowUp() {
    this.updateTouchArrowValue(DirectionArrowEnum.Up);
  }

  @HostListener('window:keyup.arrowdown')
  onArrowDown() {
    this.updateTouchArrowValue(DirectionArrowEnum.Down);
  }

  @HostListener('window:keyup.arrowleft')
  onArrowLeft() {
    this.updateTouchArrowValue(DirectionArrowEnum.Left);
  }

  @HostListener('window:keyup.arrowright')
  onArrowRight() {
    this.updateTouchArrowValue(DirectionArrowEnum.Right);
  }

  public idUp = 'up';
  public idDown = 'down';
  public idLeft = 'left';
  public idRight = 'right';

  constructor(private arrowTouchService: DirectionArrowService) {
  }

  updateTouchArrowValue(directionEnum: DirectionArrowEnum) {
    this.arrowTouchService.directionSignal.set(directionEnum);

    let direction: string | null = null;

    switch (directionEnum) {
      case DirectionArrowEnum.Up:
        direction = this.idUp;
        break;
      case DirectionArrowEnum.Down:
        direction = this.idDown;
        break;
      case DirectionArrowEnum.Left:
        direction = this.idLeft;
        break;
      case DirectionArrowEnum.Right:
        direction = this.idRight;
        break;
      default:
        direction = null;
        break;
    }

    if(direction) {
      document.getElementById(direction)?.classList.toggle('active');
      setTimeout(() => {
        document.getElementById(direction)?.classList.remove('active');
      }, 200)
    }



  }

}
