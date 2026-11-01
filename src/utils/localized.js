// اختيار الحقل حسب لغة الموقع: localized(item, 'title', i18n.language) → item.title_ar أو item.title_en
export const isArabic = (lang) => String(lang || '').startsWith('ar');

export function localized(item, field, lang) {
  if (!item) return '';
  return (isArabic(lang) ? item[`${field}_ar`] : item[`${field}_en`]) ?? '';
}
