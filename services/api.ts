import { Business, Category } from '../types';
import { MOCK_BUSINESSES } from '../constants';

// ==========================================
// CONFIGURATION
// ==========================================
const GOOGLE_SHEET_ID = '1a2jSo4Ye1Qj9O_L0EpL9VIIfVnNuf8wxKGmG_votH3I'; 

export const fetchBusinesses = async (): Promise<Business[]> => {
  if (!GOOGLE_SHEET_ID) {
    console.log('No Google Sheet ID configured. Using local mock data.');
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_BUSINESSES), 500);
    });
  }

  try {
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch from Google Sheets: ${response.statusText}`);
    }

    const csvText = await response.text();

    if (csvText.trim().startsWith('<!DOCTYPE') || csvText.includes('<html')) {
      console.error('Google Sheet is not public. Please set "Share" > "Anyone with the link".');
      return MOCK_BUSINESSES;
    }

    const parsedData = parseCSV(csvText);
    
    if (parsedData.length === 0) {
      console.warn('Google Sheet returned no data rows.');
      return MOCK_BUSINESSES;
    }

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
      const rawDetail = getValue(['detail', 'details', 'promotion', 'flyer', 'info']);
      const phone = getValue(['phone', 'contact', 'tel']) || '';
      const viber = getValue(['viber', 'viberphone']) || phone; // Fallback to phone if viber column empty

      return {
        id: getValue(['id']) || Math.random().toString(36).substr(2, 9),
        name: getValue(['name', 'businessname', 'shopname']) || 'Unknown Business',
        category: matchCategory(rawCategory),
        address: getValue(['address', 'location']) || '',
        phone: phone,
        viber: viber,
        description: getValue(['description', 'about']) || '',
        imageUrl: getDirectImageUrl(rawImage),
        googleMapLink: rawMap || '#',
        rating: parseFloat(getValue(['rating', 'stars'])) || 0,
        reviews: parseInt(getValue(['reviews', 'reviewcount'])) || 0,
        price: getValue(['price', 'cost', 'amount']),
        detail: getDirectImageUrl(rawDetail) || rawDetail
      };
    });

  } catch (error) {
    console.error('Error loading data from Google Sheets:', error);
    return MOCK_BUSINESSES;
  }
};

function getDirectImageUrl(url: string): string {
  if (!url || typeof url !== 'string') return ''; 
  const cleanUrl = url.trim();
  if (cleanUrl.length === 0) return '';
  const driveRegex = /(?:\/d\/|id=)([a-zA-Z0-9_-]{25,})/;
  const match = cleanUrl.match(driveRegex);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  return cleanUrl;
}

function matchCategory(inputString: string): Category {
  if (!inputString) return Category.FASHION;
  const normalized = inputString.toLowerCase().replace(/\s+/g, '');
  if (normalized.includes('restaurant') || normalized.includes('food')) return Category.RESTAURANT;
  if (normalized.includes('mobile') || normalized.includes('phone')) return Category.MOBILE;
  if (normalized.includes('electron') || normalized.includes('electric')) return Category.ELECTRONICS;
  if (normalized.includes('cosmetic') || normalized.includes('beauty')) return Category.COSMETICS;
  if (normalized.includes('baby') || normalized.includes('kid')) return Category.BABY;
  if (normalized.includes('furniture') || normalized.includes('sofa')) return Category.FURNITURE;
  if (normalized.includes('cloth') || normalized.includes('fashion') || normalized.includes('wear') || normalized.includes('dress')) return Category.FASHION;
  if (normalized.includes('rice') || normalized.includes('oil') || normalized.includes('grocery') || normalized.includes('kitchen')) return Category.ESSENTIALS;
  return Category.FASHION;
}

function parseCSV(csvText: string): any[] {
  const lines = csvText.split(/\r\n|\n/);
  if (lines.length === 0) return [];
  const headers = lines[0].split(',').map(h => 
    h.trim().toLowerCase().replace(/\s+/g, '').replace(/^"|"$/g, '')
  );
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const obj: any = {};
    const values: string[] = [];
    let inQuote = false;
    let currentValue = '';
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') inQuote = !inQuote;
      else if (char === ',' && !inQuote) {
        values.push(currentValue.trim());
        currentValue = '';
      } else currentValue += char;
    }
    values.push(currentValue.trim());
    headers.forEach((header, index) => {
      let val = values[index] || '';
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      val = val.replace(/""/g, '"');
      obj[header] = val;
    });
    if (Object.keys(obj).length > 0) result.push(obj);
  }
  return result;
}
