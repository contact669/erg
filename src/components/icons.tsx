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
