import { Component } from '@angular/core';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 6, 9, 12];

constructor(private service:CommonServiceService){}
ngOnInit():void{
  this.getProducts();
}
products:any;

getProducts(){
  this.service.getProducts().subscribe(res=>{
    this.products = res;
  })
}

onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
}

onTableDataChange(event: any) {
  this.page = event;
  this.getProducts();
}
}
