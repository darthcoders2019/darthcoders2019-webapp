import { Injectable } from '@angular/core';

export const lightTheme = {
  'text-color': '#1f2935',
  'background-color': '#efefef',
  'nav-color': '#c4c4c4',
  'card-color' : '#fff',
};

export const darkTheme = {
  'text-color': '#efefef',
  'background-color': '#1f2935',
  'nav-color': '#1D1D1D',
  'card-color' : '#434f5a',
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  toggleDark() {
    this.setTheme(darkTheme);
  }

  toggleLight() {
    this.setTheme(lightTheme);
  }

  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }

  // constructor() { }
}
