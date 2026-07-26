import {Component, HostBinding, HostListener, inject, Input, signal} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DirectionArrowService } from '../../services/direction-arrow.service';
import { DirectionArrowEnum } from '../../enums/direction-arrow.enum';
import {SoundService} from '../../services/sound.service';

@Component({
  selector: 'app-direction-arrows',
  imports: [
    MatIcon
  ],
  host: {
    '[attr.position]': 'position'
  },
  templateUrl: './direction-arrows.html',
  styleUrl: './direction-arrows.scss',
})
export class DirectionArrows {

  @Input() position: 'left' | 'right' = 'right';

  soundService = inject(SoundService);
  arrowTouchService = inject(DirectionArrowService);

  readonly directionArrowService = inject(DirectionArrowService);

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

  public toggleVolume() {
    this.directionArrowService.volumeEnabled.update(v => !v);
  }

  private updateTouchArrowValue(directionEnum: DirectionArrowEnum) {
    this.arrowTouchService.directionSignal.set(directionEnum);

    if(this.directionArrowService.volumeEnabled()) {
      this.soundService.playSelect();
    }
    document.getElementById(directionEnum.toString())?.classList.toggle('active');
    setTimeout(() => {
      document.getElementById(directionEnum.toString())?.classList.remove('active');
    }, 200)

  }

}
