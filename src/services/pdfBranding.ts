import QRCode from 'qrcode';

type BrandingLink = {
  label: string;
  url: string;
};

export type PdfBranding = {
  siteName: string;
  siteUrl: string;
  email: string;
  socialLinks: BrandingLink[];
  qrDataUrl: string;
};

const SITE_URL = 'https://physionutrition.vercel.app';
const SITE_NAME = 'PhysioNutrition';
const EMAIL = 'physionutritionofficial@gmail.com';
const SOCIAL_LINKS: BrandingLink[] = [
  {label: 'Facebook', url: 'https://www.facebook.com/Physionutrition.official/'},
  {label: 'Instagram', url: 'https://www.instagram.com/physionutrition.official/'},
];

let brandingPromise: Promise<PdfBranding> | null = null;

export async function getPdfBranding() {
  if (!brandingPromise) {
    brandingPromise = QRCode.toDataURL(SITE_URL, {
      margin: 1,
      width: 140,
      color: {
        dark: '#1f4d3b',
        light: '#ffffff',
      },
    }).then((qrDataUrl) => ({
      siteName: SITE_NAME,
      siteUrl: SITE_URL,
      email: EMAIL,
      socialLinks: SOCIAL_LINKS,
      qrDataUrl,
    }));
  }

  return brandingPromise;
}
