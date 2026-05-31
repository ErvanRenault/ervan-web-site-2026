import {Component, Input, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-info-container',
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './info-container.html',
  styleUrl: './info-container.scss',
})
export class InfoContainer {

  @Input() content!: TemplateRef<any>;
  // optional context passed to the projected template (e.g. { $implicit: selectedStudy })
  @Input() context?: any;


}
