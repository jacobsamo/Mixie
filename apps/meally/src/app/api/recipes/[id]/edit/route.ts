import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(res: NextApiResponse, req: NextApiRequest) {
  const data = await req.body;
  console.log(data);

  return NextResponse.json({ data });
}
