import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IReportEmbedConfiguration, models, service, Embed } from 'powerbi-client';
import { PowerBIReportEmbedComponent } from 'powerbi-client-angular';
import 'powerbi-report-authoring';
import { HtmlContentService } from '../../../html-content.service';

export interface ConfigResponse {
  Id: string;
  EmbedUrl: string;
  EmbedToken: {
    Token: string;
  };
}
@Component({
  selector: 'app-report',
  standalone: false,
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  reportConfig: IReportEmbedConfiguration = {
    type: 'report',
    embedUrl: '',
    tokenType: models.TokenType.Embed,
    accessToken: '',
    settings: undefined,
  };
  @ViewChild(PowerBIReportEmbedComponent)
  reportObj!: PowerBIReportEmbedComponent;
  eventHandlersMap = new Map([
    [
      'loaded',
      () => {
        const report = this.reportObj.getReport();
        report.setComponentTitle('Embedded report');
      },
    ],
    ['rendered', () => console.log('Report has rendered')],
    [
      'error',
      (event?: service.ICustomEvent<any>) => {
        if (event) {
          console.error(event.detail);
        }
      },
    ],
    ['visualClicked', () => console.log('visual clicked')],
    ['pageChanged', (event) => ''],
  ]) as Map<
    string,
    (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null
  >;

  @ViewChild('content') content!: ElementRef;

  constructor(private htmlContentService: HtmlContentService) { }


  ngOnInit() {
    this.embedReport();
  }

  embedReport() {
    this.reportConfig = {
      ...this.reportConfig,
      accessToken: undefined,
      id: undefined,
      embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiNzYwZDRhYTYtNjJlZC00MzFlLTk5NzYtODkyNjZhNmU5Mjg1IiwidCI6IjMwMzM2NDJkLTZhZGYtNGFjNi1iYmM1LTUxMWI0MmJjNWYwMCJ9",
    };
  }

  getHtmlContent(): void {
    if (this.content) {
      const html = this.htmlContentService.getInnerHTML(this.content.nativeElement);
      const dimensions = this.htmlContentService.getDimensionsInPercentages(this.content.nativeElement);
      console.log(html, dimensions)
      // You can now use the HTML content and dimensions as needed
    }
  }
}
