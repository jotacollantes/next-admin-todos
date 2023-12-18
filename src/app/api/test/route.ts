import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

 // Exampele Search
 // http://localhost:3000/api/hello?name=John

const { searchParams } = new URL(request.url);
const name = searchParams.get('name');

  return new Response(JSON.stringify({
    message: `Hello name`
  }), { status: 200 } );
}