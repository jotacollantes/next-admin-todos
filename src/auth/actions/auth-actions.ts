import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';

export const getUserSessionServer = async() => {
  const session = await getServerSession(authOptions);

  return session?.user;
}



export const signInEmailPassword = async( email: string, password: string ) => {

  if ( !email || !password ) return null;
  //*Busco el usuario en la BD
  const user = await prisma.user.findUnique({ where: { email } });
  //*Si el usuario no existe se lo crea 
  if ( !user ) {
    const dbUser = await createUser( email, password );
    return dbUser;
  }
  //*Si el usuario existe se verifica las contrasenas
  if ( !bcrypt.compareSync( password, user.password ?? '') ) {
    return null;
  }
  //* El usuario existe y fue verificado
  return user;
}


const createUser = async (email: string, password: string ) => {
  
  const user = await prisma.user.create({
    data: {
      email: email,
      password: bcrypt.hashSync(password),
      name: email.split('@')[0],
    }
  });

  return user;

}

