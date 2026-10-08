const apiKey = 'AIzaSyBIQ82MO17RtcjYp47ns70loV5U5YedmyA';
const playlistId = 'PLvwsqRScrkH6Xp6IPuLV3mYHZmFzXPXQT';

function testCategorization(title, description) {
  const t = title.toLowerCase();
  const d = description.toLowerCase();
  const combined = t + ' ' + d;

  // 1. Creative Arts (Cinema, Acting, Media, Art, Film, Music)
  if (
    t.includes('film') ||
    t.includes('cinema') ||
    t.includes('actor') ||
    t.includes('art') ||
    t.includes('music') ||
    t.includes('kisthenics') ||
    t.includes('vasuki') ||
    t.includes('rio raj') ||
    t.includes('makapa') ||
    t.includes('media industry') ||
    t.includes('sudhir')
  ) {
    return 'Creative Arts';
  }

  // 2. Content Creation (Youtube, Content Creation, Marketing, Social Media, Creators)
  if (
    t.includes('content creation') ||
    t.includes('marketing') ||
    t.includes('rahul m') ||
    t.includes('deepan') ||
    t.includes('youtube') ||
    t.includes('creator') ||
    t.includes('media') ||
    d.includes('content creation')
  ) {
    return 'Content Creation';
  }

  // 3. Unconventional Paths (Overcoming struggle, village, purpose, tragedy, mindset, middle class trap)
  if (
    t.includes('refused a normal life') ||
    t.includes('disappeared') ||
    t.includes('middle class trap') ||
    t.includes('purpose in life') ||
    t.includes('tragedy') ||
    t.includes('dark phase') ||
    t.includes('death') ||
    t.includes('boy from the village') ||
    t.includes('from coolie') ||
    t.includes('small town') ||
    t.includes('happiness') ||
    t.includes('chase') ||
    t.includes('ratheesh') ||
    t.includes('indu') ||
    t.includes('hard work will not make you rich')
  ) {
    return 'Unconventional Paths';
  }

  // 4. Entrepreneurs (Business, D2C, Startup, Wealth, Stocks, Real Estate, Investment, Crores)
  if (
    t.includes('wealth') ||
    t.includes('d2c') ||
    t.includes('cookd') ||
    t.includes('franchise') ||
    t.includes('stocks') ||
    t.includes('company') ||
    t.includes('restaurant') ||
    t.includes('founder') ||
    t.includes('startup') ||
    t.includes('business') ||
    t.includes('investing') ||
    t.includes('invest') ||
    t.includes('crore') ||
    t.includes('entrepreneur') ||
    t.includes('rich') ||
    t.includes('finance')
  ) {
    return 'Entrepreneurs';
  }

  return 'Unconventional Paths';
}

async function run() {
  const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`);
  const data = await res.json();
  
  const counts = { 'Unconventional Paths': 0, 'Entrepreneurs': 0, 'Creative Arts': 0, 'Content Creation': 0 };

  data.items.forEach((item, index) => {
    const title = item.snippet.title;
    const desc = item.snippet.description || '';
    const cat = testCategorization(title, desc);
    counts[cat] = (counts[cat] || 0) + 1;
    console.log(`[${index + 1}] -> ${cat} | "${title}"`);
  });

  console.log('\n--- CATEGORY BREAKDOWN ---');
  console.log(counts);
}

run();
