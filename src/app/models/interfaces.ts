export interface User {
  uid?: string;
  email: string;
  displayName?: string;
  emailVerified?: boolean;
  password?: string;
  token?: string;
}

export interface IResponse{
  email: string;
  idToken: string;
  localId: string;
  expiresIn: string;
}
export interface IUser {
  uid?: string;
  idLocal?: string;
  nickname?: string;
  password?: string;
  correo?: string;
  categoria?: 'usuario' | 'admin';
  fotoDePerfil?: string;
}
export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  presentacion: string;
  foto: string;
  supermercado: Supermercado;
  seccion: Seccion;
}
export interface Lista {
  id: string;
  usuario: IUser;
  productos: ProductoLista [];
  precioTotal: number;
  estado: EstadoLista;
  fecha: any;
}
export type  EstadoLista = 'abierta' | 'guardada';

export interface ProductoLista {
  producto: Producto;
  cantidad: number;
}
export interface Supermercado {
  id: string;
  nombre: string;
  ubicacion: string;
}
export interface Seccion {
  id: string;
  nombre: string;
}

