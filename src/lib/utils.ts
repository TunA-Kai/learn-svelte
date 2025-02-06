import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TMDBHost } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchMovies<T>({ endpoint, apiKey }: { endpoint: string; apiKey: string }) {
  try {
    const response = await fetch(`${TMDBHost}/movie/${endpoint}?page=1&api_key=${apiKey}`);
    const data = await response.json();
    return data.results as T;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint} movies:`, error);
    return [];
  }
}

export function createBackgroundPath(path: string) {
  return `https://image.tmdb.org/t/p/original${path}`;
}

export function createPosterPath(path: string) {
  return `https://image.tmdb.org/t/p/w300_and_h450_face${path}`;
}
