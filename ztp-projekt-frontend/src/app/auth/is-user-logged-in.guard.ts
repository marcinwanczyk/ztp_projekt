import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {firstValueFrom} from "rxjs";
import { Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {UiHelperService} from "../ui-helper.service";

@Injectable({
  providedIn: 'root'
})

export class IsUserLoggedInGuard implements CanActivate{
  constructor(
    private router: Router,
    private authService: AuthService,
    private uiHelper: UiHelperService
  ) {
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Promise<boolean | UrlTree> {

    let auth = await firstValueFrom(this.authService.getAuth());
    if (!auth.isLoggedIn){
     await this.uiHelper.handleError("UNAUTHORIZED", "Wystąpił błąd autoryzacji.").then();
      await this.router.navigate(['login'])
      return false;
    }

    return true;
  }

}

