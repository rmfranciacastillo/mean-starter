import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.collapse') isOpen = false;

  @HostListener('click') toggleOne() {
    this.isOpen = !this.isOpen;
    console.log('CLicked item');
  }
}
