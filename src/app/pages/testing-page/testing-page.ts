import {Component, OnInit, signal} from '@angular/core';
import {InfoContainer} from '../../components/info-container/info-container';
import {TimeLine} from '../../components/time-line/time-line';
import {HttpClient} from '@angular/common/http';

export interface Study {
  id: number;
  dateDebut: number;
  dateFin?: number;
  nomFormation?: string;
  description?: string;
}

@Component({
  selector: 'app-testing-page',
  imports: [
    InfoContainer,
    TimeLine
  ],
  templateUrl: './testing-page.html',
  styleUrl: './testing-page.scss',
})
export class TestingPage implements OnInit {

  etudesArray: Study[] = [];
  selectedStudy = signal<Study | null>(null);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/assets/siteervan-export.json').subscribe((res: any) => {
      const raw = res?.etudes || {};
      const arr: Study[] = Object.values(raw).map((v: any) => ({
        id: v.id,
        dateDebut: v.dateDebut,
        dateFin: v.dateFin,
        nomFormation: v.nomFormation,
        description: v.description
      }));
      arr.sort((a,b) => (a.dateDebut || 0) - (b.dateDebut || 0));
      this.etudesArray = arr;
      if (arr.length) this.selectedStudy.set(arr[0]);
    });
  }

  onSelect(item: Study) {
    this.selectedStudy.set(item);
  }

}
