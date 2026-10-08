const apiKey = 'AIzaSyBIQ82MO17RtcjYp47ns70loV5U5YedmyA';
const playlistId = 'PLvwsqRScrkH6Xp6IPuLV3mYHZmFzXPXQT';

function cleanDescription(desc) {
  if (!desc) return '';

  const stopTriggers = [
    'by the way, these are investment',
    'open your demat account',
    'get help choosing health',
    'research stocks and invest',
    'about me',
    'about epaphra',
    'about the thirdlane',
    'about thethirdlane',
    'you can also find me on',
    'follow me on',
    'follow on instagram',
    'follow on linkedin',
    'follow on spotify',
    'timestamps',
    '🔗',
    'http://',
    'https://',
    'ditto',
    'zerodha',
    'tickertape',
  ];

  const lines = desc.split('\n');
  const cleanLines = [];

  for (let line of lines) {
    const lower = line.toLowerCase().trim();

    // Check if line contains any stop trigger
    const shouldStop = stopTriggers.some((trigger) => lower.includes(trigger));
    if (shouldStop) {
      break;
    }

    cleanLines.push(line);
  }

  return cleanLines.join('\n').trim();
}

async function test() {
  const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${playlistId}&key=${apiKey}`);
  const data = await res.json();
  data.items.forEach((item, i) => {
    console.log(`\n=== VIDEO ${i+1}: ${item.snippet.title} ===`);
    console.log(cleanDescription(item.snippet.description));
  });
}

test();
