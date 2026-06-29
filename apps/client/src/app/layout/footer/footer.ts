import { Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly content = inject(ContentService);
  readonly year = new Date().getFullYear();
  readonly profile = this.content.getProfile();
}
