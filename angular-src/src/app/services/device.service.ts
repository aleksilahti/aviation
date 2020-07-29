import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

interface Response {
  success: boolean;
  msg: string;
}

interface Device {
  [x: string]: any;
}

interface DeviceResponse {
  success: boolean;
  msg: string;
  device: Device;
}

interface DevicesResponse {
  devices: Device[];
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  latitude;
  longitude;
  latlng;
  api = environment.api;

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
    ) { }

  openNewDeviceForm(latlng?, latitude?, longitude?) {
    //save lat/lon to this service (piped to overlay)

    this.latitude =  latitude;
    this.longitude = longitude;
    this.latlng = latlng;
    // Navigate to device Form component
    this.router.navigate(['/newdevice']);
}

addDevice(device) {
  // returns AddResponse
  const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization', this.auth.getToken());
  return this.http.post<Response>( this.api + '/devices/add', device, { headers });
}

getDeviceById(_id) {
  const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization', this.auth.getToken());
  const body = {_id: _id};
  return this.http.post<DeviceResponse>( this.api + '/devices/getById', body, { headers });
}

updateDeviceById(_id, update) {
  const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization', this.auth.getToken());
  const body = {_id: _id, update: update};
  return this.http.post<Response>( this.api + '/devices/update', body, { headers });
}

deleteDevice(device) {
  const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization', this.auth.getToken());
  return this.http.post<Response>( this.api + '/devices/delete', device, { headers });
}

getAllDevices() {
  // returns DevicesResponse
  return this.http.get<DevicesResponse>(this.api + '/devices/map');
}

getDeviceMeasurementData( device ) {
  let deveui = '';
  let count = 0;
  let character;
  let request;

  for ( character of device.deviceId ) {
    count ++;
    if ( (count % 16) === 0 ) {
      deveui = deveui + character;
    } else if ( (count % 2) === 0 ) {
      deveui = deveui + character + '-';
    } else {
      deveui = deveui + character;
    }
  }

  if (device.deviceType === 'Elsys ERS Sound') {
    // tslint:disable-next-line: max-line-length
    request = `http://pan0153.panoulu.net:8888/query?p=visualize&u=visualize&db=dev&q=SELECT "deveui","light", "humidity", "battery", "sound" "temperature", "pir" FROM "autogen"."mqtt_consumer" WHERE "deveui" = '${deveui}' AND "topic"='cwc/elsys/parsed' ORDER BY DESC LIMIT 1`;
  } else if ( device.deviceType === 'Elsys ERS CO2' ) {
    // tslint:disable-next-line: max-line-length
    request = `http://pan0153.panoulu.net:8888/query?p=visualize&u=visualize&db=dev&q=SELECT "deveui","light", "humidity", "battery", "co2" "temperature", "pir" FROM "autogen"."mqtt_consumer" WHERE "deveui" = '${deveui}' AND "topic"='cwc/elsys/parsed' ORDER BY DESC LIMIT 1`;
  }
  return this.http.get<DevicesResponse>(request);

}
}
