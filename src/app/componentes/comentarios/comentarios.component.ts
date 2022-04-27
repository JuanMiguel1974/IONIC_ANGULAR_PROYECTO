/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { userInfo } from 'os';
import { Subscription } from 'rxjs';
import { IUser, Producto } from 'src/app/models/interfaces';
import { Comentario } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements OnInit, OnDestroy {

  @Input() producto: Producto;
  @Input() datosIIser: IUser;

  comentario = '';

  comentarios: Comentario[] = [];

  suscriber: Subscription;
  suscriberUserInfo: Subscription;

  constructor(public modalController: ModalController,
              public firestoreService: FirestoreService,
              public authService: AuthService) { }

  ngOnInit() {
      console.log('producto', this.producto);
      this.loadComentarios();
  }

  ngOnDestroy(): void {
        console.log('ngOnDestroy() modal');
        if (this.suscriber) {
           this.suscriber.unsubscribe();
        }
  }

  closeModal() {
      this.modalController.dismiss();
  }

  loadComentarios() {

    let startAt = null;
    if(this.comentarios.length) {
      startAt = this.comentarios[ this.comentarios.length - 1].fecha;
    }
    const path = 'Productos/' +  this.producto.id + '/comentarios';
    this.suscriber = this.firestoreService.getCollectionPaginada<Comentario>(path, 3, startAt).subscribe( res => {
      if (res.length) {
        res.forEach( comentario => {
          const exist = this.comentarios.find( commentExist => {
            commentExist.id === comentario.id;
          });
          if (exist !== undefined) {
            this.comentarios.push(comentario);
          }
        });
        console.log(res);
      }
      console.log('loadComentarios' , this.comentarios);
    } );

  }

  comentar() {
     const comentario = this.comentario;
     console.log('comentario ->' , comentario);
     const path = 'Productos/' +  this.producto.id + '/comentarios';
     const data: Comentario = {
        autor: this.authService.datosIUser.correo,
        comentario: comentario,
        fecha: new Date(),
        id: this.firestoreService.createId()
     };
     this.firestoreService.createDocument(data, path, data.id).then( () => {
         console.log('comentario enviado');
         this.comentario = '';
     });
  }

}
