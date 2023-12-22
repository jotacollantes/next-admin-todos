import { WidgetItem } from "@/components";
//*Para obtener los datos del cliente pero desde Server Side
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
   //*Para tomar la informacion del cliente conectado ejecutamos la funcion de getServerSession y le enviamos como argumento el objeto authOptions: NextAuthOptions que esta en /api/auth/[...nextauth]/route
  const session = await getServerSession(authOptions);
   //* Validamos la ruta
  if ( !session ) {
    redirect('/api/auth/signin');
  }


  return (
    <div className="grid gap-6 grid-cols-1 ">


      <WidgetItem title="Usuario conectado S-Side">
        <div className="flex flex-col">
          {/* Mostramos la informacion del cliente conectado */}
          <span>{ session.user?.name }</span>
          <span>{ session.user?.image }</span>
          <span>{ session.user?.email }</span>
          
          <div>
            { JSON.stringify( session ) }
          </div>
        </div>
      </WidgetItem>
      

    </div>
  );
}