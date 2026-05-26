import {Component, signal} from '@angular/core';
import {form, FormField} from '@angular/forms/signals';
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {MatDatepickerToggle, MatDateRangeInput, MatDateRangePicker} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';


interface Experience {
  jobTitle: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-experience-page',
  imports: [
    MatFormField,
    MatInput,
    FormField,
    MatDateRangeInput,
    MatLabel,
    MatHint,
    MatDatepickerToggle,
    MatDateRangePicker,
    MatError,
    MatButton
  ],
  templateUrl: './experience-mgmt-page.component.html',
  styleUrl: './experience-mgmt-page.component.scss',
})
export class ExperienceMgmtPage {


  private readonly defaultExperience: Experience = {
    jobTitle: '',
    company: '',
    description: '',
    startDate: '',
    endDate: '',
  };

  experienceModel = signal<Experience>({
    jobTitle: '',
    company: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  // experienceForm.controls.jobTitle() -> valeur courante du signal
  // experienceForm.controls.jobTitle().errors() -> erreurs de validation
  experienceForm = form(this.experienceModel);

  save(): void {
    const experience = this.experienceModel();
    console.log('Saving:', experience);
    // TODO: injecter RepositoryService et appeler .add() ou .set()
  }

  reset(): void {
    this.experienceModel.set({ ...this.defaultExperience });
  }





}
