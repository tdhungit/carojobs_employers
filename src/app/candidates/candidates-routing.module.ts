import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CandidatesComponent} from "./candidates.component";
import {CandidatesDetailComponent} from "./candidates.detail.component";
import {ResumeDetailComponent} from "./resume.detail.component";
import {ResumeComponent} from "./resume.component";
import {EducationComponent} from "./education.component";
import {ExperenceComponent} from "./experence.component";
import {EducationDetailComponent} from "./education.detail.component";
import {ExperienceDetailComponent} from "./experence.detail.component";
import {ExperenceSkillComponent} from "./experenceskill.component";
import {ExperienceSkillDetailComponent} from "./experenceskill.detail.component";

const routes: Routes = [
  {
    path: '', data: {title: 'Candidates'},
    children: [
      {path: 'list', component: CandidatesComponent, data: {title: 'List Candidate'}},
      {path: 'detail-candidate/:candidate_id', component: CandidatesDetailComponent, data: {title: 'Detail Candidate'}},
      {
        path: 'resume', data: {title: 'List Resume'}, children: [
        {path: '', redirectTo: 'list', pathMatch: 'full'},
        {path: 'list', component: ResumeComponent, data: {title: 'List Resume'}},
        {path: 'detail-resume/:resume_id', component: ResumeDetailComponent, data: {title: 'Detail resume'}},
      ],
      },
      {
        path: 'education', data: {title: 'List Education'}, children: [
        {path: '', redirectTo: 'list', pathMatch: 'full'},
        {path: 'list', component: EducationComponent, data: {title: 'List Education'}},
        {
          path: 'detail-education/:education_id',
          component: EducationDetailComponent,
          data: {title: 'Detail Education'}
        },
      ]
      },
      {
        path: 'experience', data: {title: 'List Experience'}, children: [
        {path: '', redirectTo: 'list', pathMatch: 'full'},
        {path: 'list', component: ExperenceComponent, data: {title: 'List Experience'}},
        {
          path: 'detail-experience/:experience_id',
          component: ExperienceDetailComponent,
          data: {title: 'Detail experience'}
        },
      ]
      },
      {
        path: 'experience-skill', data: {title: 'List Experience Skill'}, children: [
        {path: '', redirectTo: 'list', pathMatch: 'full'},
        {path: 'list', component: ExperenceSkillComponent, data: {title: 'List Experience Skill'}},
        {path: 'detail-experience-skill/:experienceskill_id', component: ExperienceSkillDetailComponent, data: {title: 'Detail Skill experience'}},
      ]
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatesRoutingModule {
}
