import { Component } from '@angular/core';

@Component({
  selector: 'app-update',
  imports: [],
  templateUrl: './update.html',
  styleUrl: './update.css'
})
export class Update {
  registerObj: any = {
    firstName: '',
    lastName:  '',
    email:     '',
    address:   '',
    currentPassword:  '',
    newPassword: '',
  };

  constructor() {}
  
  onUpdate() {
    // Logic to handle the update operation
    console.log('Update operation initiated with:', this.registerObj);
    // Here you would typically call a service to perform the update
  }
}
