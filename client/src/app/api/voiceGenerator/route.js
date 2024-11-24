// import { NextResponse } from 'next/server';
// import { getAudioUrl } from 'google-tts-api';

// export async function POST(req) {
//   try {
//     // Log the incoming request to check the body
//     const { text, gender } = await req.json();
//     console.log('Received text:', text);
//     console.log('Received gender:', gender);

//     // Validate input
//     if (!text || typeof text !== 'string') {
//       console.log('Invalid text:', text);
//       return NextResponse.json({ error: 'Text is required and should be a string' }, { status: 400 });
//     }

//     // Get the Google TTS URL
//     const url = getAudioUrl(text, {
//       lang: 'en', // You can also use gender-specific voices (male, female) if needed
//       slow: false,
//       host: 'https://translate.google.com',
//     });

//     return NextResponse.json({ audioUrl: url }, { status: 200 });
//   } catch (error) {
//     console.error('Error generating voice:', error);
//     return NextResponse.json({ error: 'Failed to generate voice' }, { status: 500 });
//   }
// }




import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const { text, gender } = await req.json();
    console.log('Received text:', text);
    console.log('Received gender:', gender);

    // Validate input
    if (!text || typeof text !== 'string') {
      console.log('Invalid text:', text);
      return NextResponse.json({ error: 'Text is required and should be a string' }, { status: 400 });
    }

    // Set the gender-specific voice
    let voice = 'en'; // Default to English
    if (gender === 'male') {
      voice = 'en'; // English Male Voice (default)
    } else if (gender === 'female') {
      voice = 'en'; // English Female Voice (default)
    }

    // URL encode the text to ensure it's properly formatted for the query
    const encodedText = encodeURIComponent(text);

    // Construct the Google TTS URL
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${voice}&total=1&idx=0&textlen=${encodedText.length}&client=tw-ob&ttsspeed=1`;

    // Fetch the audio data from Google TTS
    const response = await axios.get(googleTtsUrl, {
      responseType: 'arraybuffer', // We want the audio as a binary stream
    });

    // Return the audio data in the response
    const audioBuffer = response.data;

    // Setting appropriate headers for audio content
    const headers = {
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length,
    };

    // Return the audio data as a response to the client
    return new NextResponse(audioBuffer, { status: 200, headers });
    
  } catch (error) {
    console.error('Error generating voice:', error);
    return NextResponse.json({ error: 'Failed to generate voice' }, { status: 500 });
  }
}
