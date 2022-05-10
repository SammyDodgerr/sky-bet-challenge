import {Injectable} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class IconRegistryService {
  icons = [
    {name: 'open-in-new', url: 'assets/SVG/open_in_new_black.svg'},
    {name: 'home', url: 'assets/SVG/home_black.svg'},
    {name: 'subscribe', url: 'assets/SVG/subscribe.svg'},
    {name: 'tick', url: 'assets/SVG/tick.svg'},
    {name: 'add', url: 'assets/SVG/add.svg'},
  ];


  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    for (const icon of this.icons) {
      iconRegistry.addSvgIcon(icon.name, sanitizer.bypassSecurityTrustResourceUrl(icon.url));
    }
  }
}
