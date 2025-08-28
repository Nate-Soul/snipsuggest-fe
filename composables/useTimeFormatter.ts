import { ref, computed } from 'vue';

/**
 * A composable for formatting ISO date strings.
 *
 * @param isoString The ISO 8601 date string to format.
 * @param options The formatting options for Intl.DateTimeFormat.
 * @returns A reactive formatted date string.
 */
export const useTimeFormatter = (isoString: string) => {
  if (!isoString) {
    console.warn('useTimeFormatter: No ISO string provided.');
    return ref(null);
  }

  // Define default formatting options
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedTime = computed(() => {
    try {
      const date = new Date(isoString);

      // Check for a valid date object
      if (isNaN(date.getTime())) {
        console.error(`useTimeFormatter: Invalid date string "${isoString}".`);
        return 'Invalid Date';
      }

      // Use the user's locale for a localized format
      // You can also pass a specific locale like 'en-US' or 'fr-FR'
      return new Intl.DateTimeFormat(undefined, defaultOptions).format(date);
    } catch (error) {
      console.error('useTimeFormatter: Formatting error', error);
      return 'Formatting Error';
    }
  });

  return {
    formattedTime,
  };
};