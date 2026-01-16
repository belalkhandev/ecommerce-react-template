/**
 * Wake Lock API type definitions
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API
 */

export interface WakeLockSentinel extends EventTarget {
  readonly released: boolean;
  readonly type: 'screen';
  release(): Promise<void>;
  onrelease: ((this: WakeLockSentinel, ev: Event) => void) | null;
}

export interface WakeLock {
  request(type: 'screen'): Promise<WakeLockSentinel>;
}

export interface NavigatorWithWakeLock extends Omit<Navigator, 'wakeLock'> {
  wakeLock?: WakeLock;
}

export interface WakeLockState {
  isSupported: boolean;
  isActive: boolean;
  isEnabled: boolean;
  error: Error | null;
}

export interface UseWakeLockReturn extends WakeLockState {
  enable: () => void;
  disable: () => void;
}
