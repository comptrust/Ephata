import { useState, useEffect } from 'react';
import { directorAvatar } from '../assets/images';

const STORAGE_KEY = 'ephata_director_avatar_custom';

/**
 * Get the current director avatar URL (either custom uploaded or bundled default)
 */
export function getDirectorAvatar(): string {
  try {
    const custom = localStorage.getItem(STORAGE_KEY);
    if (custom && custom.length > 50) {
      return custom;
    }
  } catch (e) {
    // ignore
  }
  return directorAvatar;
}

/**
 * Save and synchronize a user-uploaded photo for Alouise Emmanuel Diouf (AED)
 */
export async function uploadDirectorPhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      try {
        // 1. Store in localStorage for instant persistent display
        localStorage.setItem(STORAGE_KEY, dataUrl);

        // 2. Notify all components on the page
        window.dispatchEvent(new CustomEvent('director-avatar-updated', { detail: dataUrl }));

        // 3. Send to backend to persist to public and src asset directories
        try {
          await fetch('/api/upload-director-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: dataUrl })
          });
        } catch (serverErr) {
          // LocalStorage fallback already succeeded
          console.warn('Backend sync error:', serverErr);
        }

        resolve(dataUrl);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

/**
 * Reset avatar to original bundled asset
 */
export function resetDirectorAvatar(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('director-avatar-updated', { detail: directorAvatar }));
}

/**
 * React hook to always have the latest synchronized director avatar
 */
export function useDirectorAvatar(): {
  avatarUrl: string;
  uploadPhoto: (file: File) => Promise<string>;
  resetPhoto: () => void;
} {
  const [avatarUrl, setAvatarUrl] = useState<string>(getDirectorAvatar());

  useEffect(() => {
    const handleUpdate = (e: any) => {
      if (e.detail) {
        setAvatarUrl(e.detail);
      } else {
        setAvatarUrl(getDirectorAvatar());
      }
    };

    window.addEventListener('director-avatar-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('director-avatar-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    avatarUrl,
    uploadPhoto: uploadDirectorPhoto,
    resetPhoto: resetDirectorAvatar
  };
}
