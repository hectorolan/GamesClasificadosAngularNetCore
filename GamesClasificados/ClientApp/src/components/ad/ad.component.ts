import { Component, OnInit, OnDestroy, Input, EventEmitter } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Ad } from '../../models/ad';
import { User } from '../../models/user'
import { Console } from '../../models/console';
import { Section } from '../../models/section';
import { IHashMap } from '../../imodels/ihashmap';
import { AuthService } from '../../services/auth.service';
import { AdService } from '../../services/ad.service';
import { SectionService } from '../../services/section.service';
import { ConsoleService } from '../../services/console.service';
import { YesCancelDialogComponent } from '../dialogyescancel/yes-cancel-dialog.component';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit, OnDestroy {
  @Input()
  ad: Ad;
  @Input()
  adEmitter: EventEmitter<Ad>;
  userid: number = -1;
  sections: IHashMap;
  consoles: IHashMap;

  textDecoration: string = '';

  constructor(
    private matDialog: MatDialog,
    private authService: AuthService,
    private adService: AdService,
    private sectionService: SectionService,
    private consoleService: ConsoleService) { }

  ngOnInit(): void {
    this.setConsolesSections();
    if (this.authService.isUserLoggedIn()) {
      this.userid = this.authService.user.id;
    }
    this.setTextDecorator();
    // Subscribe for update if needed
    if (this.adEmitter) {
      this.adEmitter.subscribe(
        (ad: Ad) => {
          this.ad = ad;
          let d = new Date();
          this.ad.imageUrl = this.ad.imageUrl + '?' + d.getTime();
        });
    }
  }

  ngOnDestroy(): void {
    if (this.adEmitter) {
      this.adEmitter.unsubscribe();
    }
  }

  deleteAd(ad: Ad) {
    let dialogRef: MatDialogRef<YesCancelDialogComponent> = this.matDialog.open(YesCancelDialogComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.message = 'Are you sure you want to delete your ad?';
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result['response'] === true) {
        this.adService.deleteAd(this.ad.id).then((deleted) => {
          this.ad.expired = deleted;
          this.setTextDecorator();
        });
      }
    });
  }

  // Private Methods
  private setConsolesSections(): void {
    if (ConsoleService.consoles) {
      this.consoles = ConsoleService.consoles;
    } else {
      this.consoleService.getConsoles().then(res => this.consoles = res);
    }
    if (SectionService.sections) {
      this.sections = SectionService.sections;
    } else {
      this.sectionService.getSections().then(res => this.sections = res);
    }
  }

  private setTextDecorator(): void {
    this.textDecoration = this.ad.expired == true ? 'line-through' : '';
  }
}
