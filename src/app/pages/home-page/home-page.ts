import {Component, effect, signal} from '@angular/core';
import {SoundService} from '../../services/sound.service';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {


  public menuItems: string [] = ['About me', 'Experiences', 'Training', 'Skills', 'More'];
  selected = signal<string | null>('About Me');

  constructor(private soundService: SoundService) {
    effect(() => {
      if (this.selected()) {
        this.soundService.playSelect();
      }
    });
  }


  public updatePreSelectMenu(menu: string) {
    this.selected.set(menu);
  }

}
