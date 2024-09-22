import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


const searchIcon = document.getElementById('search-icon');
if (searchIcon) {
  searchIcon.addEventListener('click', function() {
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
      searchContainer.classList.toggle('show-search');
    }
  });
}