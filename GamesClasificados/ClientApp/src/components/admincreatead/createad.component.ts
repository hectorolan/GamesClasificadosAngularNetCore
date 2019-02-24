import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { CdkStepper, StepperSelectionEvent } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Section } from '../../models/section';
import { Console } from '../../models/console';
import { Ad } from '../../models/ad';
import { User } from '../../models/user';
import { IHashMap } from '../../imodels/ihashmap';
import { ButtonUpImgAzureComponent } from '../buttonuploadimage/button-upimg-azure.component';
import { AdService } from '../../services/ad.service';
import { AuthService } from '../../services/auth.service';
import { SectionService } from '../../services/section.service';
import { ConsoleService } from '../../services/console.service';

@Component({
  selector: 'app-createad',
  templateUrl: './createad.component.html',
  styleUrls: ['./createad.component.css']
})
export class CreateAdComponent implements OnInit {
  @ViewChild('stepper') stepper: CdkStepper;
  @ViewChild('btnUploadImage') btnUploadImage: ButtonUpImgAzureComponent;
  firstConsoleSectionFormGroup: FormGroup;
  secondTitleDescriptionFormGroup: FormGroup;
  thirdPriceFormGroup: FormGroup;

  adToSave: Ad;
  adEmitter: EventEmitter<Ad> = new EventEmitter();
  user: User;
  adImageFile: File;
  consoles: IHashMap;
  sections: IHashMap;
  prices: any;
  postReady: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private adService: AdService,
    private sectionService: SectionService,
    private consoleService: ConsoleService) { }

  ngOnInit() {
    this.buildForm();
    this.stepper.selectionChange.subscribe(
      (index: any) => {
        this.adToSave.consoleId = this.firstConsoleSectionFormGroup.controls['console'].value;
        this.adToSave.sectionId = this.firstConsoleSectionFormGroup.controls['section'].value;
        this.adToSave.title = this.secondTitleDescriptionFormGroup.controls['title'].value;
        this.adToSave.description = this.secondTitleDescriptionFormGroup.controls['description'].value;
        this.adToSave.price = this.thirdPriceFormGroup.controls['price'].value;
        this.adToSave.imageUrl = this.btnUploadImage.imageName;
        this.adEmitter.emit(this.adToSave);
      })
  }

  buildForm(): void {
    this.user = this.authService.user;
    this.adToSave = new Ad();
    this.adToSave.city = this.user.city;
    this.adToSave.telephone = this.user.telephone;
    this.adToSave.ownerName = this.user.name;
    this.adToSave.email = this.user.email;
    this.adToSave.preferedContactMethod = this.user.preferedContactMethod;
    this.prices = Ad.prices;
    this.setConsolesSections();
    this.firstConsoleSectionFormGroup = this.formBuilder.group({
      'console': [
        '',
        [Validators.required]
      ],
      'section': [
        '',
        [Validators.required]
      ]
    });
    this.secondTitleDescriptionFormGroup = this.formBuilder.group({
      'title': [
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      'description': [
        ''
      ]
    });
    this.thirdPriceFormGroup = this.formBuilder.group({
      'price': [
        '',
        [Validators.required]
      ]
    });
    this.firstConsoleSectionFormGroup.controls['console'].setValue('');
    this.firstConsoleSectionFormGroup.controls['section'].setValue('');
    this.thirdPriceFormGroup.controls['price'].setValue('');
  }

  onSubmit() {
    this.adToSave.ownerId = this.user.id;
    console.log(JSON.stringify(this.adToSave));
    this.adService.saveAd(this.adToSave, this.adImageFile).then(() => {
      this.router.navigate(['admin/myads']);
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
}
