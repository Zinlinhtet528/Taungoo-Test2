import { Business, SearchResult } from '../types';

/**
 * Simple keyword-based search without external AI services.
 * No API key needed – works on free hosting.
 */
export const searchDirectoryWithAI = async (
  query: string,
  businesses: Business[]
): Promise<SearchResult> => {
  const lowerQuery = query.toLowerCase();

  const matches = businesses.filter((b) =>
    [
      b.name,
      b.description,
      b.category,
      b.address,
    ]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(lowerQuery))
  );

  const text =
    matches.length > 0
      ? `I found ${matches.length} results matching "${query}".`
      : `No results found for "${query}". Try another shop name, category, or keyword.`;

  return {
    text,
    recommendedIds: matches.map((b) => b.id),
  };
};
