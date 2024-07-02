import { Component, ElementRef, ViewChild } from '@angular/core';
import { HtmlContentService } from '../../html-content.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'ngrix';
  @ViewChild('content') content!: ElementRef;

  constructor(private htmlContentService: HtmlContentService) { }

  cards = [
    { title: 'Card 1', content: 'This is the content of card 1.' },
    { title: 'Card 2', content: 'This is the content of card 2.' },
    { title: 'Card 3', content: 'This is the content of card 3.' },
    { title: 'Card 4', content: 'This is the content of card 4.' }
  ];

  getHtmlContent(): void {
    if (this.content) {
      const html = this.htmlContentService.getInnerHTML(this.content.nativeElement);
      const dimensions = this.htmlContentService.getDimensionsInPercentages(this.content.nativeElement);
      // You can now use the HTML content and dimensions as needed
    }
  }
}
