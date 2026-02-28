import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create URLSearchParams for Google Apps Script (it expects URL-encoded data)
    const params = new URLSearchParams({
      name: body.name,
      brand: body.brand || '',
      whatsapp: body.whatsapp || '',
      email: body.email,
      services: body.services || '',
      message: body.message
    });

    // Google Apps Script URL from environment variables
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

    // Validate that the Google Apps Script URL is configured
    if (!googleScriptUrl) {
      console.error('GOOGLE_SCRIPT_URL environment variable is not set');
      return NextResponse.json(
        { success: false, error: 'Server configuration error. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Server-side fetch - bypasses CORS completely
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    // Log the response for debugging
    const responseText = await response.text();
    console.log('Google Apps Script response:', responseText);

    // Try to parse JSON response
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      // If response is not JSON, treat it as success if the request was successful
      result = { success: response.ok, message: responseText };
    }

    // Check if Google Apps Script call was successful
    if (response.ok && result.success) {
      return NextResponse.json({ 
        success: true,
        message: 'Form submitted successfully and saved to Google Sheets'
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to save to Google Sheets',
          details: result.error || responseText
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('API route error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to submit form',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
