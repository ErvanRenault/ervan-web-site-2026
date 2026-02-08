import { Component } from '@angular/core';
import {InfoContainer} from '../../components/info-container/info-container';

@Component({
  selector: 'app-testing-page',
  imports: [
    InfoContainer
  ],
  templateUrl: './testing-page.html',
  styleUrl: './testing-page.scss',
})
export class TestingPage {

}
