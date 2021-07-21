import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Emprendedor } from 'src/app/models/emprendedor';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  emprendedor!: Emprendedor;
  myForm!: FormGroup;
  date!:any;
  private isEmail = /\S+@\S+.S+/;

  constructor(private router: Router,
    private fb: FormBuilder,
    private service: ServiceService,
    private snackBar: MatSnackBar,
    private route: Router
    ) { 

  }

  ngOnInit(): void {
    this.initForm();
    
  }

  private initForm():void{
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      entrepreneurship: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      detail: ['', [Validators.required]]
    });
  }
 
  guardarEmprendedor():void {
    this.date = new Date().toLocaleString();
    
    const emprendedor: Emprendedor = {
      name: this.myForm.get('name').value,
      entrepreneurship: this.myForm.get('entrepreneurship').value,
      email: this.myForm.get('email').value,
      phone: this.myForm.get('phone').value,
      address: this.myForm.get('address').value,
      detail : this.myForm.get('detail').value,
      date : this.date,
    };
    this.service.agregarEmprendedor(emprendedor);
    this.myForm.reset();
    
    console.log(emprendedor)
    

    /*this.service.agregarEmprendedor(emprendedor).subscribe(
      (success => this.onAgregarSuccess(success)),
      (error => this.onAgregarError(error))
    );*/
  }

  onAgregarSuccess(success){
    
    this.snackBar.open('El emprendedor fue registrado con exito!', '', {
      duration: 3000,
    });
    this.route.navigate(['/emprendedores']);
  }

  onAgregarError(error){
    
    this.snackBar.open('El emprendedor no pudo ser registrado!', '', {
      duration: 3000,
    });
  }

}
