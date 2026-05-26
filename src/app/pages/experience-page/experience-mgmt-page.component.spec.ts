import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceMgmtPage } from './experience-mgmt-page.component';

describe('ExperiencePage', () => {
  let component: ExperienceMgmtPage;
  let fixture: ComponentFixture<ExperienceMgmtPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceMgmtPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceMgmtPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
