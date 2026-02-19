export interface DefaultProjectItem {
  id: string;
  image: string;
  titleHe: string;
  titleEn: string;
  categoryHe: string;
  categoryEn: string;
  resultHe: string;
  resultEn: string;
  descriptionHe: string;
  descriptionEn: string;
  liveUrl?: string;
}

export const defaultProjectsFromCsv: DefaultProjectItem[] = [
  {
    id: 'dr-amit-website',
    image: '/projects/dr-amit-website.png',
    titleEn: "Dr. Amit Druyan's website",
    titleHe: 'האתר של ד"ר עמית',
    liveUrl: 'https://amitdr.com',
    categoryEn: 'Website Design',
    categoryHe: 'עיצוב אתרים',
    resultEn: 'Live Website',
    resultHe: 'אתר חי באוויר',
    descriptionEn:
      'A website for a medical specialist, built for clear information, easy booking, and direct communication with patients.',
    descriptionHe:
      'אתר לרופא מומחה, עם הצגת מידע ברור, אפשרות לקביעת תורים, ותקשורת ישירה עם המטופלים.',
  },
  {
    id: 'clothing-brand-store',
    image: '/projects/clothing-brand-store.png',
    titleEn: 'Online clothing store',
    titleHe: 'חנות למותג בגדים',
    liveUrl: 'https://kabiofficial.com',
    categoryEn: 'Landing Page',
    categoryHe: 'חנות דיגיטלית',
    resultEn: 'Live Website',
    resultHe: 'אתר חי באוויר',
    descriptionEn:
      'A minimal, modern store with Israeli payment integration, built with a custom structure, not a template.',
    descriptionHe:
      'אתר מינימליסטי וחדשני, עם חיבור לסליקה ישראלית. האתר בנוי בצורה מותאמת אישית, לא על תבנית.',
  },
  {
    id: 'revital-studio-website',
    image: '',
    titleEn: 'Website for a clothing studio',
    titleHe: 'אתר לסטודיו בגדים',
    liveUrl: 'https://revitalstudio.co.il',
    categoryEn: 'Website Design',
    categoryHe: 'עיצוב אתרים',
    resultEn: 'Live Website',
    resultHe: 'אתר חי באוויר',
    descriptionEn:
      'A website that turns followers into customers. The website we built for Revital Studio Boutique reflects the warmth and love behind the brand, leading visitors to buy.',
    descriptionHe:
      'אתר שהופך עוקבות ללקוחות. האתר שבנינו לבוטיק סטודיו רויטל משקף את החום והאהבה של המותג, ומוביל את הלקוחות לרכישה.',
  },
  {
    id: 'netta-zentner-portfolio',
    image: '/projects/netta-zentner-portfolio.png',
    titleEn: "Netta Zentner's website",
    titleHe: 'האתר של נטע זנטנר',
    liveUrl: 'https://www.nettazentner.com',
    categoryEn: 'Website Design',
    categoryHe: 'עיצוב אתרים',
    resultEn: 'Live Website',
    resultHe: 'אתר חי באוויר',
    descriptionEn:
      "A website that presents Netta's interior design work. Clean, aesthetic, and professional, built to showcase projects and drive inquiries.",
    descriptionHe:
      'אתר שמציג את עבודות עיצוב הפנים של נטע. אתר נקי, אסתטי ומקצועי, עם הצגה ברורה של פרויקטים והנעה ליצירת קשר.',
  },
  {
    id: 'yochi-engleister-portfolio',
    image: '/projects/yochi-engleister-portfolio.png',
    titleEn: "Yochi Engleister's website",
    titleHe: 'האתר של יוכי אנגליסטר',
    liveUrl: 'https://anglistery.wixsite.com/website-54',
    categoryEn: 'Website Design',
    categoryHe: 'עיצוב אתרים',
    resultEn: 'Live Website',
    resultHe: 'אתר חי באוויר',
    descriptionEn:
      'Her website showcases her portfolio, featuring a striking collection of images. The site meets the standards of an art school.',
    descriptionHe:
      'האתר מציג את הפורטפוליו שלה, עם אוסף מרהיב של תמונות. האתר בנוי ברמה שעומדת בסטנדרטים של בית ספר לאמנות.',
  },
];
