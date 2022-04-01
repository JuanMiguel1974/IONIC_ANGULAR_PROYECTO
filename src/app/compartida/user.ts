export interface User {
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
}

export interface Cliente{
  id: string;
  productos: string[];
  listas: string[];
  nickname: string;
  avatar: string;
}
