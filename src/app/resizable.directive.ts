import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appResizable]'
})
export class ResizableDirective {
  private resizing = false;
  private startX = 0;
  private startY = 0;
  private startWidth = 0;
  private startHeight = 0;
  private currentHandle: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.createHandles();
  }

  private createHandles() {
    const handles = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    handles.forEach(handle => {
      const div = this.renderer.createElement('div');
      this.renderer.addClass(div, 'resize-handle');
      this.renderer.addClass(div, handle);
      this.renderer.setStyle(div, 'width', '10px');
      this.renderer.setStyle(div, 'height', '10px');
      this.renderer.setStyle(div, 'background', 'gray');

      if (handle === 'top-left') {
        this.renderer.setStyle(div, 'top', '-5px');
        this.renderer.setStyle(div, 'left', '-5px');
        this.renderer.setStyle(div, 'cursor', 'nwse-resize');
      } else if (handle === 'top-right') {
        this.renderer.setStyle(div, 'top', '-5px');
        this.renderer.setStyle(div, 'right', '-5px');
        this.renderer.setStyle(div, 'cursor', 'nesw-resize');
      } else if (handle === 'bottom-left') {
        this.renderer.setStyle(div, 'bottom', '-5px');
        this.renderer.setStyle(div, 'left', '-5px');
        this.renderer.setStyle(div, 'cursor', 'nesw-resize');
      } else if (handle === 'bottom-right') {
        this.renderer.setStyle(div, 'bottom', '-5px');
        this.renderer.setStyle(div, 'right', '-5px');
        this.renderer.setStyle(div, 'cursor', 'nwse-resize');
      }

      this.renderer.appendChild(this.el.nativeElement, div);

      this.renderer.listen(div, 'mousedown', (event: MouseEvent) => this.onMouseDown(event));
      this.renderer.listen(div, 'touchstart', (event: TouchEvent) => this.onTouchStart(event));
    });
  }

  private onMouseDown(event: MouseEvent) {
    this.startResize(event, event.clientX, event.clientY);
  }

  private onTouchStart(event: TouchEvent) {
    this.startResize(event, event.touches[0].clientX, event.touches[0].clientY);
  }

  private startResize(event: any, clientX: number, clientY: number) {
    this.resizing = true;
    this.currentHandle = event.target as HTMLElement;
    this.startX = clientX;
    this.startY = clientY;
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.startWidth = rect.width;
    this.startHeight = rect.height;
    this.renderer.addClass(this.el.nativeElement, 'resizing');

    const allCards = document.querySelectorAll('.card');
    // allCards.forEach(card => {
    //   if (card !== this.el.nativeElement) {
    //     this.renderer.addClass(card, 'hidden');
    //   }
    // });

    event.preventDefault(); // Prevent text selection
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.onMove(event.clientX, event.clientY);
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    this.onMove(event.touches[0].clientX, event.touches[0].clientY);
  }

  private onMove(clientX: number, clientY: number) {
    if (!this.resizing || !this.currentHandle) {
      return;
    }

    const diffX = clientX - this.startX;
    const diffY = clientY - this.startY;

    if (this.currentHandle.classList.contains('top-left')) {
      this.renderer.setStyle(this.el.nativeElement, 'width', `${this.startWidth - diffX}px`);
      this.renderer.setStyle(this.el.nativeElement, 'height', `${this.startHeight - diffY}px`);
      // this.renderer.setStyle(this.el.nativeElement, 'left', `${clientX}px`);
      // this.renderer.setStyle(this.el.nativeElement, 'top', `${clientY}px`);
    } else if (this.currentHandle.classList.contains('top-right')) {
      this.renderer.setStyle(this.el.nativeElement, 'width', `${this.startWidth + diffX}px`);
      this.renderer.setStyle(this.el.nativeElement, 'height', `${this.startHeight - diffY}px`);
      // this.renderer.setStyle(this.el.nativeElement, 'right', `${clientX}px`);
      // this.renderer.setStyle(this.el.nativeElement, 'top', `${clientY}px`);
    } else if (this.currentHandle.classList.contains('bottom-left')) {
      this.renderer.setStyle(this.el.nativeElement, 'width', `${this.startWidth - diffX}px`);
      this.renderer.setStyle(this.el.nativeElement, 'height', `${this.startHeight + diffY}px`);
    } else if (this.currentHandle.classList.contains('bottom-right')) {
      this.renderer.setStyle(this.el.nativeElement, 'width', `${this.startWidth + diffX}px`);
      this.renderer.setStyle(this.el.nativeElement, 'height', `${this.startHeight + diffY}px`);
    }
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  onEnd() {
    if (this.resizing) {
      this.resizing = false;
      this.renderer.removeClass(this.el.nativeElement, 'resizing');

      // const allCards = document.querySelectorAll('.card');
      // allCards.forEach(card => {
      //   if (card != this.el.nativeElement)
      //     this.renderer.addClass(card, 'change-index')
      //   else
      //     this.renderer.removeClass(card, 'change-index')
      //   this.renderer.removeClass(card, 'hidden');
      // });
    }
    this.currentHandle = null;
  }
}
