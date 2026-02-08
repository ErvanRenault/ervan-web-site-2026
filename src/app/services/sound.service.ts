import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SoundService {

  private audio?: HTMLAudioElement;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.audio = new Audio('/assets/sounds/cursor-move.mp3');
    }
  }

  playSelect() {
    if (!this.isBrowser || !this.audio) return;

    this.audio.currentTime = 0;
    this.audio.volume = 0.2;
    this.audio.play().catch(() => {});
  }
}
