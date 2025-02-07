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

/**
 * A generic debounce function.
 *
 * @param func - The function to debounce.
 * @param delay - The delay in milliseconds to wait before calling the function.
 * @returns A debounced version of the original function.
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function debouncedFunction(...args: Parameters<T>): void {
    // Clear the previous timer, if any.
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // Set a new timer that will execute the function after the delay.
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
