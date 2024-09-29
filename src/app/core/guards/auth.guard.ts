import { CanActivateFn } from '@angular/router';
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
