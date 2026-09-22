import {Routes} from '@angular/router';
import {HomePage} from './pages/home-page/home-page';
import { TestingPage } from './pages/testing-page/testing-page';
import {ExperienceMgmtPage} from './pages/experience-page/experience-mgmt-page.component';

export const routes: Routes = [
  {path: '', component: HomePage},
  {path: 'test', component: TestingPage,  data: {pageName: 'Testing'},},
  {path: 'about', component: TestingPage,  data: {pageName: 'About'},},
  {path: 'experiences-mgmt', component: ExperienceMgmtPage}
];


