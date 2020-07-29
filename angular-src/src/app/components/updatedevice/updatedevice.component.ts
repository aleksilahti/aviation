import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';
import { DeviceService } from '../../services/device.service';

interface DeviceUpdate {
  deviceId?: string;
  deviceType?: string;
  location?: string;
  description?: string;
  status?: string;
  floorLevel?: string;
  image?: ImageData | null;
}

@Component({
  selector: 'app-updatedevice',
  templateUrl: './updatedevice.component.html',
  styleUrls: ['./updatedevice.component.css']
})
export class UpdatedeviceComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  /* state */
  deviceId = '';
  deviceType = '';
  location = '';
  description = '';
  status = '';
  floorLevel = '';
  userFullName = '';
  image: ImageData;

  _id = '';
  oldDevice: DeviceUpdate;
  
  private routeSubscription: any;
  loading = true;
  
  /* options */
  statusOptions = ['installed', 'planned'];
  deviceTypeOptions = ['Elsys ERS C02', 'Elsys ERS Sound', 'Other'];
  floorLevelOptions = ['-2', '-1', '1', '2', '3', '4', '5', '6'];

  ngOnInit(): void {
    // get param id
    this.routeSubscription = this.route.params.subscribe(params => {
      const _id = params['id'];
      this._id = _id;
      // view device of id
      this.deviceService.getDeviceById(_id).subscribe(res => {
        this.loading = false;
        if (!res.success) {
          this.flashMessage.show(res.msg, {cssClass: 'alert-danger', timeout: 4000});
          /* TODO: goto previous page */
          return;
        }
        const device = res.device;
        this.oldDevice = res.device;

        /* view */
        this.deviceId = device.deviceId;
        this.deviceType = device.deviceType;
        this.location = device.location.coordinates ? `${device.location.coordinates[0]}, ${device.location.coordinates[1]}` : '';
        this.description = device.description;
        this.status = device.status;
        this.floorLevel = device.floorLevel;
        // TODO: show image

        /* view user name */
        const user_id = device.addedByUser;
        this.authService.getOtherUser(user_id).subscribe(res => {
          if (!res.success) {
            this.flashMessage.show('Failed fetching user details', {cssClass: 'alert-danger', timeout: 4000});
            return;
          }
          this.userFullName = res.user.name;
        });
      });
    });
  }

  goToMap() {
    this.router.navigate(['/manage']);
  }

  /* update */
  onUpdateSubmit() {
    let update: DeviceUpdate = {};
    for (let key in this.oldDevice) {
      if (this.oldDevice[key] !== this[key]) {
        console.debug(`Found delta ${key}`);
        //update[key] = this[key];
      }
    }
    this.flashMessage.show('Not implemented!', {cssClass: 'alert-danger', timeout: 4000});
    // update
    /*
    this.deviceService.updateDeviceById(this._id, update).subscribe(res => {
      if (!res.success) {
        this.flashMessage.show('Failed to update', {cssClass: 'alert-danger', timeout: 4000});
        return;
      }
      this.flashMessage.show('Sensor updated', {timeout: 4000});
      // TODO: reload view
    });
    */
  }
}
