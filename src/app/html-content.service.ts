import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HtmlContentService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  getInnerHTML(element: HTMLElement): string {
    return element.innerHTML;
  }

  getDimensionsInPercentages(element: HTMLElement): { width: string, height: string } {
    const parentElement = element.parentElement;
    if (parentElement) {
      const parentRect = parentElement.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      const widthPercentage = (elementRect.width / parentRect.width) * 100;
      const heightPercentage = (elementRect.height / parentRect.height) * 100;

      return {
        width: widthPercentage.toFixed(2) + '%',
        height: heightPercentage.toFixed(2) + '%'
      };
    }
    return { width: '0%', height: '0%' };
  }
}
