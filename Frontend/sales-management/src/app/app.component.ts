import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container">
      <h1>Sales Management</h1>
      <nav>
        <a routerLink="/products" routerLinkActive="active">Products</a>
        <a routerLink="/sales" routerLinkActive="active">Sales</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      nav a {
        margin-right: 15px;
        text-decoration: none;
        color: blue;
      }
      nav a.active {
        font-weight: bold;
      }
    `,
  ],
})
export class AppComponent {}