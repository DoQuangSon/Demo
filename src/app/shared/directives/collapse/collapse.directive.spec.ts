import { CollapseDirective } from './collapse.directive';
import {ElementRef} from "@angular/core";

describe('CollapseDirective', () => {
  it('should create an instance', () => {
    const directive = new CollapseDirective(new ElementRef(null));
    expect(directive).toBeTruthy();
  });
});
