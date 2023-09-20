import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  private userToken:any;

  constructor(private http:HttpClient) { }


  register(data:any){

    return this.http.post<any>("http://localhost:5000/register", data)
  }


  login(email: string, password: string) {  
  
    return this.http.post<any>("http://localhost:5000/login", {email,password}).pipe(
      map((token) => {
        // console.log('token' + token.access_token);
        this.userToken = token.token;
        sessionStorage.setItem("TOKEN_KEY", this.userToken);
      })
    )
  }

  logout() {
    this.userToken = undefined;
    sessionStorage.removeItem("TOKEN_KEY");
  }


  getProducts(){

    return this.http.get("http://localhost:5000/products")
  }
}