import { Directive, ElementRef, Renderer2, AfterViewInit  } from '@angular/core';

@Directive({
  selector: '[appSpinner]'
})
export class SpinnerDirective implements AfterViewInit{
  oldImg: any;
  newImg: any;
  parent: any;
  elNewRef: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }


  ngAfterViewInit() {
    this.oldImg = this.el.nativeElement.getAttribute('src');
    this.renderer.setAttribute( this.el.nativeElement, 'src', 'https://mymobil.ru/img/misc/waiting.gif');

    this.newImg = this.renderer.createElement('img');
    this.renderer.setAttribute(this.newImg, 'src', this.oldImg);
    this.elNewRef = this.el.nativeElement;

    this.renderer.listen(this.newImg , 'load', () => {
      this.parent = this.renderer.parentNode(this.el.nativeElement);
      setTimeout(() => {
        this.renderer.insertBefore( this.parent, this.newImg,  this.elNewRef);
        this.renderer.removeChild(this.parent, this.el.nativeElement);
      }, 1000);

    });
  }
}
