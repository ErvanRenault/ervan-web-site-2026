import {Routes} from '@angular/router';
import {HomePage} from './pages/home-page/home-page';
import { TestingPage } from './pages/testing-page/testing-page';

export const routes: Routes = [
  {path: '', component: HomePage},
  {path: 'test', component: TestingPage}
];


