import { NextResponse, NextRequest } from 'next/server';
import { getPlaiceholder } from 'plaiceholder';

export async function POST(req: NextRequest) {
  const imageUrls = await req.json();

  if (!Array.isArray(imageUrls)) {
    return NextResponse.json(
      { error: 'Invalid data format. Expected an array.' },
      { status: 400 }
    );
  }

  try {
    const generateBlurDataUrls = async () => {
      const promises = imageUrls.map(async (imageUrl) => {
        const buffer = await fetch(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageUrl}?img-width=10&img-height=10`
        ).then(async (res) => Buffer.from(await res.arrayBuffer()));

        const { base64 } = await getPlaiceholder(buffer);
        return base64;
      });

      const results = await Promise.all(promises);
      return results;
    };

    const blurDataUrls = await generateBlurDataUrls();

    return NextResponse.json({ blurDataUrls }, { status: 200 });
  } catch (error) {
    console.error('Error generating plaiceholder:', error);
    return NextResponse.json(
      { error: 'Failed to generate blurDataUrls' },
      { status: 500 }
    );
  }
}
