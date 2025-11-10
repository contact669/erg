import type { SVGProps } from 'react';

export function ErgLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M4 4H20V8H4V4Z"
        fill="currentColor"
        className="text-primary/70"
      />
      <path
        d="M4 10H14V14H4V10Z"
        fill="currentColor"
        className="text-primary"
      />
      <path
        d="M4 16H20V20H4V16Z"
        fill="currentColor"
        className="text-accent"
      />
    </svg>
  );
}

export function GoogleIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
            <path fill="#4285F4" d="M21.35 11.1h-9.1v3.4h5.8c-.2 1.1-.9 2-2 2.6-1.1.6-2.5.9-4.2.9-3.4 0-6.3-2.8-6.3-6.3s2.8-6.3 6.3-6.3c1.9 0 3.3.7 4.3 1.7l2.8-2.8C17.3 2.9 15 2 12.5 2c-5.5 0-10 4.5-10 10s4.5 10 10 10c5.5 0 10-4.5 10-10 0-.7 0-1.4-.2-2.1z" />
        </svg>
    )
}
