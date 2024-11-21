import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  a = fetch('url').then((data) => {
    console.log(data);
  });
}
