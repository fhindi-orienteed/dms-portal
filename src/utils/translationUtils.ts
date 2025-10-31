/**
 * Get translated status text
 * @param status - The status string from API
 * @param t - Translation function from useTranslation hook
 * @returns Translated status string
 */
export const getStatusTranslationKey = (status: string | undefined, entity?: string | undefined): string => {
  if (!status) {
    return 'status.unknown';
  }

  let key = 'status';
  if (entity) {
    key += `.${entity.toLowerCase()}`;
  }

  key += '.' + status.toLowerCase().replace(/\s+/g, '_');

  return key;
};
