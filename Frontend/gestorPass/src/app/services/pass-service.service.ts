import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pass } from '../models/pass'

@Injectable({
  providedIn: 'root'
})
export class PassServiceService{
  URL_API = 'http://localhost:3100'
  contrasenas: Pass[] = []; 
  contrasenaSeleccionada: Pass = { 
    url: '',
    email: '',
    password: '',
    fecha: '',
    detalles: ''
  }; 


  constructor(private http:HttpClient) { }

  obtenerPasswords(){
    // return 'Listado de contraseñas'
    let peticion = this.http.get<Pass[]>(this.URL_API + '/passwords')
    return peticion;
  }
  guardarPassword(p:Pass){
    return this.http.post(this.URL_API + '/password', p)
  }
  eliminarPassword(id:string){
    let eliminado = this.http.delete(this.URL_API + '/passwords/' + id )
    return eliminado
  }
  editarPassword(p:Pass){
    return this.http.put(this.URL_API + '/passwordel/' + p._id, p )
  }
}
