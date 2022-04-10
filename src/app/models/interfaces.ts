export interface User {
  uid?: string;
  email?: string;
  displayName?: string;
  emailVerified?: boolean;
  password?: string;
  token?: string;
}

export interface IResponse{
  idToken: string;
}

export interface Cliente {
  uid: string;
  listas: string[];
  productos: string[];
  lista: string[];
  nickname: string;
  avatar: string;
  correo: string;
  password: string;
  perfil: 'cliente' | 'admin';
}

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  presentacion: string;
  foto: string;
  supermercado: string;
}

export interface Lista {
  lid: string;
  productos: string[];
  total: number;
  mes: string;
}

export interface Super {
  spid: string;
  nombre: string;
}

export interface Totales {
  totid: string;
  meses: string[];
  sumaMes: number;
}
