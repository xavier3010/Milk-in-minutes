import { Component, ViewChild } from '@angular/core';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild(ContentComponent)
  contentComponent!: ContentComponent;
  
  onSearch(term: string) {
    this.contentComponent.onSearch(term);
  }
}
