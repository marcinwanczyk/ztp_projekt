import {CanActivateFn, Router} from '@angular/router';
import {firstValueFrom, lastValueFrom} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {UiHelperService} from "../ui-helper.service";

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const uiHelper = inject(UiHelperService);
  const router = inject(Router);
  let auth = await authService.checkAuth();
  if(!auth.isLoggedIn){
    await router.navigate(['/login']);
    return false;
  }
  return true;
};
