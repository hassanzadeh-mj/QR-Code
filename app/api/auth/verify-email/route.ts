import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://172.86.116.116:8002';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const user_token = searchParams.get('token');

  if (!user_token) {
    return NextResponse.redirect(
      new URL('/verify-email?error=Token is missing', request.url)
    );
  }

  try {
    const response = await fetch(
      `${BASE_URL}/api/auth/verify-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: user_token }),
      } 
    );

    console.log('Response status:', response.status, response.ok);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || errorData.detail || 'Verification failed';
      return NextResponse.redirect(
        new URL(`/verify-email?error=${encodeURIComponent(errorMessage)}`, request.url)
      );
    }

    const data = await response.json();
    console.log('Response data:', data);

    if (data.token) {
      const redirectUrl = new URL('/verify-email', request.url);
      redirectUrl.searchParams.set('success', 'true');
      redirectUrl.searchParams.set('token', data.token);
      
      const nextResponse = NextResponse.redirect(redirectUrl);
      nextResponse.cookies.set('auth_token', data.token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });
      
      return nextResponse;
    }

    return NextResponse.redirect(
      new URL('/verify-email?success=true', request.url)
    );
  } catch (error: unknown) {
    const errorMessage = 
      error instanceof Error 
        ? error.message 
        : 'Verification failed';
    
    return NextResponse.redirect(
      new URL(`/verify-email?error=${encodeURIComponent(errorMessage)}`, request.url)
    );
  }
}
