import { Component } from '@angular/core';
import {InfoContainer} from '../../components/info-container/info-container';
import {TimeLine} from '../../components/time-line/time-line';

@Component({
  selector: 'app-testing-page',
  imports: [
    InfoContainer,
    TimeLine
  ],
  templateUrl: './testing-page.html',
  styleUrl: './testing-page.scss',
})
export class TestingPage {

}
