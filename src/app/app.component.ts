import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'look-to-the-stars-frontend';

  showSidebar = false;

  /**
   * Show/Hide sidebar
   */
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  /**
   * Close the sidebar.
   * @param event Event data.
   */
  closeSidebar(event) {
    this.showSidebar = false;
  }

  /**
   * Change sidebar open state if another control changes its state.
   * @param opened Current state of sidebar.
   */
  updateSidebarOpenState(opened: boolean) {
    this.showSidebar = opened;
  }
}
