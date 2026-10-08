import Image from 'next/image';
export function Star({ className = '', size = 64 }: { className?: string; size?: number }) {
  return <Image className={`star ${className}`} src="/images/glowth-logo.png" width={size} height={size} alt="" aria-hidden="true" />;
}
export function Brand() {
  return <a className="brand" href="/concept-1" aria-label="Glowth home"><Star /><span>glowth</span></a>;
}
