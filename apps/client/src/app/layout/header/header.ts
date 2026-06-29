import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { ContentService } from '../../core/services/content';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ButtonModule, ThemeToggle],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly content = inject(ContentService);

  readonly profile = this.content.getProfile();

  readonly navItems = [
    { label: 'About', fragment: 'about' },
    { label: 'Services', fragment: 'services' },
    { label: 'Experience', fragment: 'experience' },
    { label: 'Projects', fragment: 'projects' },
    { label: 'Contact', fragment: 'contact' },
  ];
}
