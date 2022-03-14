import { Component, OnInit } from '@angular/core';
import {PassServiceService} from '../services/pass-service.service'
import {NgForm} from '@angular/forms'
import {Pass} from '../models/pass'


@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})
export class PasswordsComponent implements OnInit {

  constructor(public servicioPass: PassServiceService) { }

  ngOnInit(): void {
    // console.log(this.servicioPass.obtenerPasswords())
    this.servicioPass.obtenerPasswords().subscribe({
      next: res => this.servicioPass.contrasenas = res,
      error: err => console.log(err)
    });
  }

  listadoPasswords(){
    this.servicioPass.obtenerPasswords().subscribe({
     next: res => this.servicioPass.contrasenas = res,
     error: err => console.log(err)
    });
  }
  agregarpass(form: NgForm){
    if (form.value._id){
      // modificar password
      this.servicioPass.editarPassword(form.value).subscribe({
        next: res => {
          this.limpiarForm(form)
          this.listadoPasswords()
        },
        error: err => console.log(err)
      })
    }else{
      // agregar password nueva
    this.servicioPass.guardarPassword(form.value).subscribe({
      next: res => this.listadoPasswords(),
      error: err => console.log(err)
    })
  }
  }
  deletepass(id:any){
    let prueba = confirm("Seguro que quieres eliminar?")
    if (prueba == true){
      this.servicioPass.eliminarPassword(id).subscribe({
        next: res => this.listadoPasswords(),
        error: err => console.log(err)
      })
    }
  }
  modificarpass(p:Pass){
    console.log(p);
    this.servicioPass.contrasenaSeleccionada = p
    
  }
  limpiarForm(formulario:NgForm){
    formulario.reset();
  }
}
