import { AfterViewInit, Component, effect, HostListener, OnInit, signal, untracked } from '@angular/core';
import { SoundService } from '../../services/sound.service';
import { DirectionArrows } from '../../components/direction-arrows/direction-arrows';
import { DirectionArrowService } from '../../services/direction-arrow.service';
import { DirectionArrowEnum } from '../../enums/direction-arrow.enum';
import { ActivatedRoute, Router } from '@angular/router';


interface MenuItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-home-page',
  imports: [
    DirectionArrows
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit, AfterViewInit {


  @HostListener('document:keydown', ['$event'])
  async onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') return;

    event.preventDefault();
    await this.goToPage(this.selected().route);
  }
  public menuItems: MenuItem[] = [
    {label: 'About Me', route: '/about'},
    {label: 'Experiences', route: '/about'},
    {label: 'Training', route: '/about'},
    {label: 'Skills', route: '/about'},
    {label: 'More', route: '/about'},
  ];

  selected = signal<MenuItem>(this.menuItems[0]);

  constructor(private soundService: SoundService, private directionArrowService: DirectionArrowService, private router: Router) {
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

  public updatePreSelectMenu(menu: MenuItem) {
    this.selected.set(menu);
  }

  private updateSelected() {
    let currentSelectedIndex = this.menuItems.indexOf(this.selected());
    const directionEnum = this.directionArrowService.directionSignal();

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

  async goToPage(route: string) {
    await this.router.navigate(['/test']);
  }

}
