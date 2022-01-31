import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { StorageService } from "../../services/storage/storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./app.login.component.html",
})
export class AppLoginComponent implements OnInit {
  public isSubmit = false;
  public isLoading = false;
  public form: FormGroup;
  public passVisibility = "off";
  public error: any;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private storageSrv: StorageService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
      password: new FormControl("", Validators.required),
    });
  }

  onInvalidField(fieldTag) {
    return (
      this.form.get(fieldTag).invalid &&
      (this.isSubmit || this.form.get(fieldTag).touched)
    );
  }

  onValidator(fieldTag: string, validatorTag: string) {
    const field = this.form.controls[fieldTag];
    return (
      field.errors &&
      field.errors[validatorTag] &&
      (this.isSubmit || field.touched)
    );
  }

  onLogin() {
    this.isLoading = true;
    if (this.form.valid) {
      this.authSrv.login(this.form.value).subscribe((resp: any) => {
        const { res, msg, token } = resp;
        this.storageSrv.setToken(token);
        if (res) {
          this.authSrv.getUser(true).subscribe((user: any) => {
            if (user.res) {
              this.storageSrv.setUser(user.user);
              this.router.navigateByUrl("/");
            }
          });
        } else {
          console.log(msg);
        }
      }, err => {
        this.error = err.error?.message || err.error?.msg;
      });
    }
  }
}
