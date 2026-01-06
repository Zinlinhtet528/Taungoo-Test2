
import { Business, Category } from '../types';
import { MOCK_BUSINESSES } from '../constants';

const GOOGLE_SHEET_ID = '1a2jSo4Ye1Qj9O_L0EpL9VIIfVnNuf8wxKGmG_votH3I'; 

export const fetchBusinesses = async (): Promise<Business[]> => {
  if (!GOOGLE_SHEET_ID) {
    return MOCK_BUSINESSES;
  }

  try {
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Fetch failed');
    const csvText = await response.text();
    const parsedData = parseCSV(csvText);
    
    return parsedData.map(row => {
      const getValue = (keys: string[]) => {
        for (const key of keys) {
          if (row[key] !== undefined) return row[key];
        }
        return '';
      };

      const rawCategory = getValue(['category', 'type', 'cat']);
      const rawImage = getValue(['imageurl', 'image', 'photo', 'picture', 'img']);
      const rawMap = getValue(['googlemaplink', 'map', 'googlemap', 'locationlink']);
      const rawDetail = getValue(['detail', 'details', 'info']);
      const phone = getValue(['phone', 'contact', 'tel']) || '';

      return {
        id: getValue(['id']) || Math.random().toString(36).substr(2, 9),
        name: getValue(['name', 'businessname', 'shopname']) || 'Unknown Shop',
        category: matchCategory(rawCategory),
        address: getValue(['address', 'location']) || '',
        phone: phone,
        viber: getValue(['viber']) || phone,
        description: getValue(['description', 'about']) || '',
        imageUrl: getDirectImageUrl(rawImage),
        googleMapLink: rawMap || '#',
        rating: parseFloat(getValue(['rating', 'stars'])) || 4.5,
        reviews: parseInt(getValue(['reviews', 'reviewcount'])) || 10,
        price: getValue(['price', 'cost']),
        detail: getDirectImageUrl(rawDetail) || rawDetail
      };
    });
  } catch (error) {
    console.error('Error loading data:', error);
    return MOCK_BUSINESSES;
  }
};

function getDirectImageUrl(url: string): string {
  if (!url) return '';
  const driveRegex = /(?:\/d\/|id=)([a-zA-Z0-9_-]{25,})/;
  const match = url.match(driveRegex);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  return url;
}

function matchCategory(inputString: string): Category {
  if (!inputString) return Category.FASHION;
  const norm = inputString.toLowerCase();
  
  if (norm.includes('ပဲ') || norm.includes('bean')) return Category.BEANS;
  if (norm.includes('သစ်သီး') || norm.includes('fruit')) return Category.FRUITS;
  if (norm.includes('ကုန်စိမ်း') || norm.includes('vegetable')) return Category.GROCERIES;
  if (norm.includes('rest') || norm.includes('food')) return Category.RESTAURANT;
  if (norm.includes('mobile') || norm.includes('phone')) return Category.MOBILE;
  if (norm.includes('elect')) return Category.ELECTRONICS;
  if (norm.includes('cosmet') || norm.includes('beauty')) return Category.COSMETICS;
  if (norm.includes('baby') || norm.includes('kid')) return Category.BABY;
  if (norm.includes('furniture')) return Category.FURNITURE;
  if (norm.includes('cloth') || norm.includes('fashion')) return Category.FASHION;
  if (norm.includes('rice') || norm.includes('oil')) return Category.ESSENTIALS;
  
  return Category.FASHION;
}

function parseCSV(csvText: string): any[] {
  const lines = csvText.split(/\r\n|\n/);
  if (lines.length === 0) return [];
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/\s+/g, '').replace(/^"|"$/g, ''));
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const obj: any = {};
    const values: string[] = [];
    let inQuote = false, currentValue = '';
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') inQuote = !inQuote;
      else if (char === ',' && !inQuote) { values.push(currentValue.trim()); currentValue = ''; }
      else currentValue += char;
    }
    values.push(currentValue.trim());
    headers.forEach((h, idx) => {
      let val = values[idx] || '';
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      obj[h] = val.replace(/""/g, '"');
    });
    result.push(obj);
  }
  return result;
}
