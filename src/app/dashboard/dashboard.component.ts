import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from '../shared/sidemenu/sidemenu.component';
import { TitleComponent } from '../shared/title/title.component';

@Component({
  standalone: true,
  imports: [RouterModule,SidemenuComponent,TitleComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent {

}
