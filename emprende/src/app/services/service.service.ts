import { Injectable } from '@angular/core';
import { Emprendedor } from '../models/emprendedor';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  listEmprendedores: Observable<Emprendedor[]>;
  listEmprendedor: Emprendedor;

  private emprendedorCollection : AngularFirestoreCollection<Emprendedor>;

  constructor(
    private readonly afs: AngularFirestore
  ) { 
    this.emprendedorCollection = afs.collection<Emprendedor>('emprendedores');
    this.listarEmprendedores();
  }


  agregarEmprendedor(emprendedor: Emprendedor) : Promise<void>{
    return new Promise( async (resolve, reject) => {
      try{
        const id = this.afs.createId();
        const data = { id, ...emprendedor};
        const result = await this.emprendedorCollection.doc(id).set(data);
        resolve(result)
      }catch(err){
        reject(err.message);
      }
    });
  }

  private listarEmprendedores() : void{
    this.listEmprendedores = this.emprendedorCollection.snapshotChanges().pipe(
      map(actions => actions.map( a => a.payload.doc.data() as Emprendedor))
    )
  }



}
