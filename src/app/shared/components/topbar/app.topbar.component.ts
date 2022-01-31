import { Component, OnDestroy } from "@angular/core";
import { AppComponent } from "../../../app.component";
import { AppMainComponent } from "../main/app.main.component";
import { Subscription } from "rxjs";
import { MenuItem } from "primeng/api";
import { AuthService } from "../../../services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-topbar",
  templateUrl: "./app.topbar.component.html",
})
export class AppTopBarComponent implements OnDestroy {
  subscription: Subscription;

  items: MenuItem[];

  constructor(
    public app: AppComponent,
    public appMain: AppMainComponent,
    private authSrv: AuthService,
    private router: Router,
  ) {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    this.authSrv.logout(true).subscribe((resp: any) => {
      if (resp.res) {
          localStorage.clear();
          this.router.navigateByUrl("/login");
      }
    });
  }
}
