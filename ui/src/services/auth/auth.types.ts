export interface RegisterUser {
    name: string
    email: string
    password:string
  }
  export interface LoginTypes {
    email: string
    password: string
  }
 
  export interface UserTypes {
    _id: string;
    created_at: string;
    name: string;  
    email: string;
  }