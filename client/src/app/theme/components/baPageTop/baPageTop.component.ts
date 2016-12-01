import {Component, ViewEncapsulation} from '@angular/core';

import {GlobalState} from '../../../global.state';


import {Router} from '@angular/router';
import {UserService} from "../../../services/user-service.service";

@Component({
  selector: 'ba-page-top',
  styles: [require('./baPageTop.scss')],
  template: require('./baPageTop.html'),
  encapsulation: ViewEncapsulation.None
})
export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  private isLoggedIn: boolean = false;

  constructor(private _state:GlobalState, private _router: Router, private userService: UserService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.isLoggedIn = this.userService.isLoggedIn();
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  private goToRegistrationForm(){
    this._router.navigate(['register']);
  }


}
