import { AfterViewInit, Component, effect, OnInit, signal, untracked } from '@angular/core';
import { SoundService } from '../../services/sound.service';
import { DirectionArrows } from '../../components/direction-arrows/direction-arrows';
import { DirectionArrowService } from '../../services/direction-arrow.service';
import { DirectionArrowEnum } from '../../enums/direction-arrow.enum';

@Component({
  selector: 'app-home-page',
  imports: [
    DirectionArrows
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit, AfterViewInit {


  public menuItems: string [] = ['About me', 'Experiences', 'Training', 'Skills', 'More'];
  selected = signal<string>(this.menuItems[0]);

  constructor(private soundService: SoundService, private directionArrowService: DirectionArrowService) {
    effect(() => {
      if (this.selected()) {
        this.soundService.playSelect();
      }
    });
    effect(() => {
      const direction = this.directionArrowService.directionSignal();
      if (direction == null) return;

      untracked(() => {
        this.updateSelected();
        this.directionArrowService.clear();
      });
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.selected.set(this.menuItems[0]);
  }

  public updatePreSelectMenu(menu: string) {
    this.selected.set(menu);
  }

  private updateSelected() {
    let currentSelectedIndex = this.menuItems.indexOf(this.selected());
    const directionEnum = this.directionArrowService.directionSignal();
    console.log(directionEnum);

    if (currentSelectedIndex == 0 && directionEnum == DirectionArrowEnum.Up) {
      this.selected.set(this.menuItems[this.menuItems.indexOf(this.menuItems[this.menuItems.length - 1])]);
      return;
    }

    if (currentSelectedIndex == this.menuItems.length - 1 && directionEnum == DirectionArrowEnum.Down) {
      this.selected.set(this.menuItems[0]);
      return;
    }

    if (directionEnum == DirectionArrowEnum.Down) {
      this.selected.set(this.menuItems[currentSelectedIndex + 1]);
      return;
    }

    if (directionEnum == DirectionArrowEnum.Up) {
      this.selected.set(this.menuItems[currentSelectedIndex - 1]);
      return;
    }
  }

}
