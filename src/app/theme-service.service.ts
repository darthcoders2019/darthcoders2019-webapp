import { Injectable } from '@angular/core';

export const lightTheme = {
  'text-color': '#000',
  'background-color': '#fff',
  'nav-color': '#e5e5e5',
};

export const darkTheme = {
  'text-color': '#fff',
  'background-color': '#1f2935',
  'nav-color': '#1D1D1D',

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
