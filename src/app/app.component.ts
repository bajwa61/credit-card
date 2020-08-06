import { Component,ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SignaturePad } from 'angular2-signaturepad';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent{
  customerName:String;
  myDate:any = new Date();
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
 
  signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 450,
    'canvasHeight': 190,
    'backgroundColor':"rgb(255,255,255)"
  };
 
  constructor(private datePipe: DatePipe,private http:Http){
      this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }
  ngAfterViewInit() {
      this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
      this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
 
  drawComplete() {
    console.log(this.signaturePad.toDataURL());
  }
 
  drawStart() {
  }
  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

  submitForm(form:NgForm){
    const data={
      creditCardOwner:form.value.creditCardOwner,
      creditCardNumber:form.value.creditCardNumber,
      creditCardType:form.value.creditCardType,
      creditCardExpiryMonth:form.value.creditCardExpiryMonth,
      creditCardExpYear:form.value.creditCardExpYear,
      creditCardCVV:form.value.creditCardCVV,
      companyName:form.value.companyName,
      customerNumber:form.value.customerNumber,
      zip:form.value.zip,
      invoiceNumber:form.value.invoiceNumber,
      companyName2:form.value.companyName2,
      signatureImg:this.signaturePad.toDataURL()
    }
      console.log(data);
      this.http.post('http://localhost:3000/',data).subscribe((result)=>{
          if(result){
            alert(result);
            window.location.reload();
          }
      })
  }
  
}
