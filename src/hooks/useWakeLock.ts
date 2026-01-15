import { useState, useEffect, useCallback, useRef } from 'react';

type WakeLockSentinelLike = {
  release: () => Promise<void>;
  addEventListener: (type: 'release', listener: () => void) => void;
};

interface WakeLockState {
  isSupported: boolean;
  isActive: boolean;
  isEnabled: boolean;
  error: Error | null;
}

interface UseWakeLockReturn extends WakeLockState {
  enable: () => void;
  disable: () => void;
}

const useWakeLock = (): UseWakeLockReturn => {
  const [isSupported, setIsSupported] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const wakeLockRef = useRef<WakeLockSentinelLike | null>(null);
  const hasUserInteracted = useRef(false);
  const enabledRef = useRef(false);

  // Detect support
  useEffect(() => {
    setIsSupported('wakeLock' in navigator);
  }, []);

  const requestWakeLock = useCallback(async () => {
    if (!isSupported || !enabledRef.current) return;

    try {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
      }

      const sentinel = await (navigator as any).wakeLock.request('screen');
      wakeLockRef.current = sentinel;
      setIsActive(true);
      setError(null);

      sentinel.addEventListener('release', () => {
        setIsActive(false);
      });

    } catch (err) {
      const e = err instanceof Error ? err : new Error('Wake lock request failed');
      setError(e);
      setIsActive(false);

      if (e.name !== 'NotAllowedError') {
        console.warn('WakeLock error:', e);
      }
    }
  }, [isSupported]);

  const releaseWakeLock = useCallback(async () => {
    try {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        setIsActive(false);
      }
    } catch {
      // silent
    }
  }, []);

  const enable = useCallback(() => {
    enabledRef.current = true;
    setIsEnabled(true);

    if (hasUserInteracted.current) {
      requestWakeLock();
    }
  }, [requestWakeLock]);

  const disable = useCallback(() => {
    enabledRef.current = false;
    setIsEnabled(false);
    releaseWakeLock();
  }, [releaseWakeLock]);

  // Visibility handling
  useEffect(() => {
    if (!isSupported) return;

    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && enabledRef.current && hasUserInteracted.current) {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isSupported, requestWakeLock]);

  // First user interaction
  useEffect(() => {
    if (!isSupported) return;

    const handler = () => {
      if (!hasUserInteracted.current) {
        hasUserInteracted.current = true;
        if (enabledRef.current) {
          requestWakeLock();
        }
      }
    };

    const events = ['click', 'touchstart', 'keydown', 'scroll'];

    events.forEach(event =>
        window.addEventListener(event, handler, { once: true, passive: true })
    );

    return () => {
      events.forEach(event => window.removeEventListener(event, handler));
    };
  }, [isSupported, requestWakeLock]);

  // Cleanup
  useEffect(() => {
    return () => {
      releaseWakeLock();
    };
  }, [releaseWakeLock]);

  return {
    isSupported,
    isActive,
    isEnabled,
    error,
    enable,
    disable,
  };
};

export default useWakeLock;
