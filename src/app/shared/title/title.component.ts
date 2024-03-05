import { Component, Input, booleanAttribute } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-title',
  imports: [],
  template: '<h1 class="text-3xl mb-5">{{title}} </h1>',
  styles: ``
})
export class TitleComponent {
  @Input({required:true}) title: string = '';
  @Input({transform:booleanAttribute}) withshadow: boolean = false;
}
