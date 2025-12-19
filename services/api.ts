import { Business, Category } from '../types';
import { MOCK_BUSINESSES } from '../constants';

// ==========================================
// CONFIGURATION
// ==========================================
// PASTE YOUR NEW GOOGLE SHEET ID HERE FOR THE SHOP PROJECT
const GOOGLE_SHEET_ID = '1a2jSo4Ye1Qj9O_L0EpL9VIIfVnNuf8wxKGmG_votH3I'; 

export const fetchBusinesses = async (): Promise<Business[]> => {
  if (!GOOGLE_SHEET_ID) {
    console.log('No Google Sheet ID configured. Using local mock data.');
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_BUSINESSES), 500);
    });
  }

  try {
    // Using /gviz/tq?tqx=out:csv is often more reliable than /export?format=csv
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch from Google Sheets: ${response.statusText}`);
    }

    const csvText = await response.text();

    // Check if Google redirected to a login page (HTML) instead of giving CSV
    if (csvText.trim().startsWith('<!DOCTYPE') || csvText.includes('<html')) {
      console.error('Google Sheet is not public. Please set "Share" > "Anyone with the link".');
      return MOCK_BUSINESSES; // Fallback to mock data so app doesn't break
    }

    const parsedData = parseCSV(csvText);
    
    // If parsing returned empty list (maybe empty sheet), use mock data to show something
    if (parsedData.length === 0) {
      console.warn('Google Sheet returned no data rows.');
      return MOCK_BUSINESSES;
    }

    return parsedData.map(row => {
      // Helper to find data regardless of exact column name
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

      return {
        id: getValue(['id']) || Math.random().toString(36).substr(2, 9),
        name: getValue(['name', 'businessname', 'shopname']) || 'Unknown Business',
        category: matchCategory(rawCategory),
        address: getValue(['address', 'location']) || '',
        phone: getValue(['phone', 'contact', 'tel']) || '',
        description: getValue(['description', 'about']) || '',
        imageUrl: getDirectImageUrl(rawImage),
        googleMapLink: rawMap || '#',
        rating: parseFloat(getValue(['rating', 'stars'])) || 0,
        reviews: parseInt(getValue(['reviews', 'reviewcount'])) || 0,
        price: getValue(['price', 'cost', 'amount']),
        detail: getDirectImageUrl(rawDetail) || rawDetail // Attempt to clean URL if it is one, otherwise keep text
      };
    });

  } catch (error) {
    console.error('Error loading data from Google Sheets:', error);
    return MOCK_BUSINESSES;
  }
};

/**
 * Converts various image URL formats (like Google Drive) to a direct usable link.
 */
function getDirectImageUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return ''; 
  }
  
  const cleanUrl = url.trim();
  if (cleanUrl.length === 0) return '';

  // Handle Google Drive IDs
  const driveRegex = /(?:\/d\/|id=)([a-zA-Z0-9_-]{25,})/;
  const match = cleanUrl.match(driveRegex);
  
  if (match && match[1]) {
    // Use the thumbnail endpoint which is more reliable for embedding
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }

  return cleanUrl;
}

/**
 * Enhanced category matching for the specific Shop categories
 */
function matchCategory(inputString: string): Category {
  if (!inputString) return Category.FASHION; // Default if empty
  
  const normalized = inputString.toLowerCase().replace(/\s+/g, ''); // remove spaces
  
  // Direct Map
  if (normalized.includes('restaurant') || normalized.includes('food')) return Category.RESTAURANT;
  if (normalized.includes('mobile') || normalized.includes('phone')) return Category.MOBILE;
  if (normalized.includes('electron') || normalized.includes('electric')) return Category.ELECTRONICS;
  if (normalized.includes('cosmetic') || normalized.includes('beauty')) return Category.COSMETICS;
  if (normalized.includes('baby') || normalized.includes('kid')) return Category.BABY;
  if (normalized.includes('furniture') || normalized.includes('sofa')) return Category.FURNITURE;
  
  // Specific Grouping
  if (normalized.includes('cloth') || normalized.includes('fashion') || normalized.includes('wear') || normalized.includes('dress')) return Category.FASHION;
  if (normalized.includes('rice') || normalized.includes('oil') || normalized.includes('grocery') || normalized.includes('kitchen')) return Category.ESSENTIALS;

  return Category.FASHION; // Default fallback if unknown
}

function parseCSV(csvText: string): any[] {
  const lines = csvText.split(/\r\n|\n/);
  if (lines.length === 0) return [];

  // Remove potential quotes from headers
  const headers = lines[0].split(',').map(h => 
    h.trim().toLowerCase().replace(/\s+/g, '').replace(/^"|"$/g, '')
  );
  
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const obj: any = {};
    let currentLine = line;
    
    // Simple CSV parser that handles quoted strings containing commas
    const values: string[] = [];
    let inQuote = false;
    let currentValue = '';

    for (let j = 0; j < currentLine.length; j++) {
      const char = currentLine[j];
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim()); // Push last value

    // Map values to headers
    headers.forEach((header, index) => {
      let val = values[index] || '';
      // Remove surrounding quotes if present
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      }
      // Unescape double quotes
      val = val.replace(/""/g, '"');
      obj[header] = val;
    });

    // Only add if it has at least a name or some content
    if (Object.keys(obj).length > 0) {
        result.push(obj);
    }
  }

  return result;
}
