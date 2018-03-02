import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CaroJobsModule} from '../shared/carojobs.module';
import {ModalModule, PaginationModule, PaginationConfig} from 'ng2-bootstrap';
import {CandidatesRoutingModule} from "./candidates-routing.module";
import {CandidatesComponent} from "./candidates.component";
import {CandidatesDetailComponent} from "./candidates.detail.component";
import {ResumeComponent} from "./resume.component";
import {ResumeDetailComponent} from "./resume.detail.component";
import {CKEditorModule} from "ng2-ckeditor";
import {EducationComponent} from "./education.component";
import {ExperenceComponent} from "./experence.component";
import {ExperienceDetailComponent} from "./experence.detail.component";
import {EducationDetailComponent} from "./education.detail.component";
import {ExperenceSkillComponent} from "./experenceskill.component";
import {ExperienceSkillDetailComponent} from "./experenceskill.detail.component";

@NgModule({
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    ChartsModule,
    CaroJobsModule,
    ModalModule,
    PaginationModule,
    FormsModule,
    CKEditorModule
  ],
  declarations: [
    CandidatesComponent,
    CandidatesDetailComponent,
    ResumeComponent,
    ResumeDetailComponent,
    EducationComponent,
    EducationDetailComponent,
    ExperenceComponent,
    ExperienceDetailComponent,
    ExperenceSkillComponent,
    ExperienceSkillDetailComponent
  ],
  providers: [PaginationConfig]
})
export class CandidatesModule {
}
