import {Component, Input, TemplateRef} from '@angular/core';
import {NgTemplateOutlet, UpperCasePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-info-container',
  imports: [
    NgTemplateOutlet,
    UpperCasePipe,
    TranslatePipe
  ],
  templateUrl: './info-container.html',
  styleUrl: './info-container.scss',
})
export class InfoContainer {

  @Input() content!: TemplateRef<any>;
  // optional context passed to the projected template (e.g. { $implicit: selectedStudy })
  @Input() context?: any;


}
