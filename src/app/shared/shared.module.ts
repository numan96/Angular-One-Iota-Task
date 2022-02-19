import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RecentlyViewedProductsComponent } from './recently-viewed-products/recently-viewed-products.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  declarations: [HeaderComponent, RecentlyViewedProductsComponent],
  exports: [HeaderComponent, RecentlyViewedProductsComponent],
})
export class SharedModule {}
