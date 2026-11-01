// بيانات تجريبية — سيتم استبدالها بجداول Supabase لاحقاً بنفس أسماء الحقول

const img = (text) => `https://placehold.co/800x500/e8edf5/1E4D8C?text=${encodeURIComponent(text)}`;

export const newsCategories = [
  { value: 'company', ar: 'أخبار الشركة', en: 'Company news' },
  { value: 'investment', ar: 'استثمارات', en: 'Investments' },
  { value: 'events', ar: 'فعاليات', en: 'Events' },
];

export const news = [
  {
    id: 'n1',
    title_ar: 'نوفيدا تعلن نتائج أعمال الربع الثالث',
    title_en: 'Novida announces Q3 results',
    description_ar: 'نمو في الإيرادات مقارنة بالفترة نفسها من العام الماضي.',
    description_en: 'Revenue grew compared with the same period last year.',
    content_ar: 'نص تجريبي لمحتوى الخبر بالعربي.',
    content_en: 'Sample news content in English.',
    image_url: img('News 1'),
    date: '2026-10-15',
    category: 'company',
    active: true,
  },
  {
    id: 'n2',
    title_ar: 'توقيع اتفاقية شراكة جديدة',
    title_en: 'New partnership agreement signed',
    description_ar: 'اتفاقية تعاون استراتيجي في قطاع التكنولوجيا.',
    description_en: 'A strategic cooperation agreement in technology.',
    content_ar: 'نص تجريبي لمحتوى الخبر بالعربي.',
    content_en: 'Sample news content in English.',
    image_url: img('News 2'),
    date: '2026-09-02',
    category: 'investment',
    active: true,
  },
  {
    id: 'n3',
    title_ar: 'مشاركة نوفيدا في ملتقى الاستثمار',
    title_en: 'Novida at the investment forum',
    description_ar: 'عرض رؤية الشركة أمام المستثمرين.',
    description_en: "Presenting the company's vision to investors.",
    content_ar: 'نص تجريبي لمحتوى الخبر بالعربي.',
    content_en: 'Sample news content in English.',
    image_url: '',
    date: '2026-07-20',
    category: 'events',
    active: false,
  },
];

export const projects = [
  { id: 'p1', title_ar: 'مشروع تجريبي ١', title_en: 'Sample project 1', description_ar: 'وصف مختصر للمشروع.', description_en: 'Short project description.', image_url: img('Project 1'), sort_order: 1, active: true },
  { id: 'p2', title_ar: 'مشروع تجريبي ٢', title_en: 'Sample project 2', description_ar: 'وصف مختصر للمشروع.', description_en: 'Short project description.', image_url: img('Project 2'), sort_order: 2, active: true },
  { id: 'p3', title_ar: 'مشروع تجريبي ٣', title_en: 'Sample project 3', description_ar: 'وصف مختصر للمشروع.', description_en: 'Short project description.', image_url: img('Project 3'), sort_order: 3, active: false },
];

export const leadership = [
  { id: 'l1', name_ar: 'الاسم الأول', name_en: 'First Member', position_ar: 'رئيس مجلس الإدارة', position_en: 'Chairman', image_url: '', sort_order: 1, active: true },
  { id: 'l2', name_ar: 'الاسم الثاني', name_en: 'Second Member', position_ar: 'نائب رئيس مجلس الإدارة', position_en: 'Vice Chairman', image_url: '', sort_order: 2, active: true },
  { id: 'l3', name_ar: 'الاسم الثالث', name_en: 'Third Member', position_ar: 'عضو مجلس الإدارة', position_en: 'Board Member', image_url: '', sort_order: 3, active: true },
];

export const reports = [
  { id: 'r1', type: 'board', title_ar: 'تقرير مجلس الإدارة عن عام 2025', title_en: 'Board report 2025', date: '2026-03-10', year: '2025', file_url: '', active: true },
  { id: 'r2', type: 'board', title_ar: 'تقرير مجلس الإدارة عن عام 2024', title_en: 'Board report 2024', date: '2025-03-12', year: '2024', file_url: '', active: true },
  { id: 'r3', type: 'general_assembly', title_ar: 'محضر الجمعية العامة العادية', title_en: 'Ordinary general assembly minutes', date: '2026-04-05', year: '2026', file_url: '', active: true },
];

export const about = [
  { id: 'a1', title_ar: 'من نحن', title_en: 'Who we are', description_ar: 'نص تجريبي عن الشركة.', description_en: 'Sample text about the company.', image_url: img('About 1'), image_position: 'left', sort_order: 1, active: true },
  { id: 'a2', title_ar: 'رؤيتنا', title_en: 'Our vision', description_ar: 'نص تجريبي عن الرؤية.', description_en: 'Sample vision text.', image_url: img('About 2'), image_position: 'right', sort_order: 2, active: true },
];

export const chairman = {
  name_ar: 'اسم رئيس مجلس الإدارة',
  name_en: 'Chairman Name',
  position_ar: 'رئيس مجلس الإدارة',
  position_en: 'Chairman of the Board',
  message_title_ar: 'كلمة رئيس مجلس الإدارة',
  message_title_en: "Chairman's message",
  message_ar: 'نص تجريبي لكلمة رئيس مجلس الإدارة.',
  message_en: "Sample text for the chairman's message.",
  image_url: '',
};
