import { Component, OnInit, ɵConsole } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DeviceService } from '../../services/device.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-newdevice',
  templateUrl: './newdevice.component.html',
  styleUrls: ['./newdevice.component.css']
})

export class NewdeviceComponent implements OnInit {
  /* state */
  deviceId: string;
  deviceType = 'Elsys ERS C02';
  location: string;
  description: string;
  status = 'installed';
  floorlevel = '1';
  image: ImageData;
  user: {name: '', username: null, email: null, _id: null};
  
  /* options */
  statusOptions = ['installed', 'planned'];
  deviceTypeOptions = ['Elsys ERS C02', 'Elsys ERS Sound', 'Other'];
  floorlevelOptions = ['-2', '-1', '1', '2', '3', '4', '5', '6'];



  constructor(
    private flashMessage: FlashMessagesService,
    private deviceService: DeviceService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.location = this.deviceService.latlng;
    //Get profile information
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 10000});
      return false;
    });
  }

  goToMap() {
    this.router.navigate(['/manage']);
  }

  onRegisterSubmit() {
    const device = {
      deviceId: this.deviceId,
      deviceType: this.deviceType,
      description: this.description,
      image: this.image,
      status: this.status,
      floorLevel: this.floorlevel,
      location: { type: 'Point', coordinates: [ this.deviceService.latitude, this.deviceService.longitude ] },
      addedByUser: this.user._id
    };
    console.log(device);

    // Register device
    this.deviceService.addDevice(device).subscribe(res => {
      if (res.success) {
        this.flashMessage.show('Device Added', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/manage']);
      } else if (!res.success) {
        this.flashMessage.show(res.msg, {cssClass: 'alert-danger', timeout: 4000});
        this.router.navigate(['/newdevice']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 4000});
        this.router.navigate(['/manage']);
      }
    });
  }
}
