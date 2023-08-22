import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST (req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }


    if (!name) {
      return new NextResponse('Nombre requerido', { status: 400 })
    }

  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}