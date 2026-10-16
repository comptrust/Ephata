/**
 * Robust image fallback utility for Ephata Consulting Academy.
 * Prevents broken images, infinite onError loops, and handles relative vs absolute path resolutions.
 */

// Elegant default SVG placeholder with Ephata Academy branding
export const DEFAULT_COURSE_THUMBNAIL = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0B192C;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1E3E62;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="url(#grad)" />
  <circle cx="400" cy="180" r="60" fill="#F59E0B" fill-opacity="0.15" stroke="#F59E0B" stroke-width="3" />
  <path d="M375 180 L395 200 L430 160" fill="none" stroke="#F59E0B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="400" y="275" font-family="sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF" text-anchor="middle">EPHATA CONSULTING GROUP</text>
  <text x="400" y="310" font-family="sans-serif" font-size="14" fill="#F59E0B" text-anchor="middle" letter-spacing="2">FORMATION & EXCELLENCE PROFESSIONNELLE</text>
  <text x="400" y="335" font-family="sans-serif" font-size="12" fill="#94A3B8" text-anchor="middle">Sicap liberté 5A, Dakar Sénégal · +221 77 507 91 84</text>
</svg>
`)}`;

export const DEFAULT_DIRECTOR_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <defs>
    <linearGradient id="avgrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1E3E62;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0B192C;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="100" fill="url(#avgrad)" />
  <circle cx="100" cy="80" r="35" fill="#F59E0B" />
  <ellipse cx="100" cy="160" rx="55" ry="35" fill="#F59E0B" />
  <text x="100" y="90" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0B192C" text-anchor="middle">AED</text>
</svg>
`)}`;

/**
 * Handle image loading failure gracefully without infinite loops.
 */
export function handleImgError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackType: 'course' | 'avatar' = 'course'
) {
  const target = event.currentTarget;
  const attempts = parseInt(target.getAttribute('data-error-attempts') || '0', 10);

  if (attempts >= 2) {
    // Final fallback to clean inlined SVG (guaranteed to render offline and on any server)
    target.src = fallbackType === 'avatar' ? DEFAULT_DIRECTOR_AVATAR : DEFAULT_COURSE_THUMBNAIL;
    return;
  }

  target.setAttribute('data-error-attempts', String(attempts + 1));

  const currentSrc = target.src;
  const filename = currentSrc.split('/').pop()?.split('?')[0] || '';

  // Attempt 1: try public images folder or relative path
  if (currentSrc.includes('/assets/')) {
    target.src = `./images/${filename.replace(/-[a-zA-Z0-9_-]+\.jpg$/, '.jpg')}`;
  } else if (!currentSrc.includes('/images/')) {
    target.src = `/images/${filename}`;
  } else {
    // If /images/ already failed, use SVG
    target.src = fallbackType === 'avatar' ? DEFAULT_DIRECTOR_AVATAR : DEFAULT_COURSE_THUMBNAIL;
  }
}
