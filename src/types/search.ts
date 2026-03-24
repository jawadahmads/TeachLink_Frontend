// Search Types

export type PriceRange = "all" | "low" | "medium" | "high";

export type SortOption = "rating" | "price-low" | "price-high" | "students";

export interface SearchFilters {
  query: string;
  subjects: string[];
  priceRange: PriceRange;
  sortBy: SortOption;
  day: string;
}

export interface SearchState {
  results: import("./teacher").TeacherSearchResult[];
  filters: SearchFilters;
  loading: boolean;
  error: string | null;
  totalResults: number;
}

export const PRICE_LABELS: Record<PriceRange, string> = {
  all: "Global Average",
  low: "Economy (Under $40/hr)",
  medium: "Professional ($40-50/hr)",
  high: "Elite ($50+/hr)",
};

export const SORT_LABELS: Record<SortOption, string> = {
  rating: "Highest Rated",
  "price-low": "Price: Low to High",
  "price-high": "Price: High to Low",
  students: "Most Students",
};
