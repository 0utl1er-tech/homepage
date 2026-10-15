/* GA4 へのイベント送信。gtag が無い（ブロックされている等）ときは何もしない。 */

type GtagFn = (command: "event", name: string, params?: Record<string, unknown>) => void;

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}
