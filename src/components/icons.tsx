import type { SVGProps } from "react";

export const TikTokIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8.5c-2.43.67-4.23 2.9-4.5 5.5-1.5-1-2.5-3-2.5-5 .01-2.76 2.24-5 5-5 .93 0 1.8.28 2.5.83" />
      <path d="M12 14v4a2 2 0 0 0 2 2h4" />
      <path d="M12 20a8 8 0 1 0-8-8" />
    </svg>
  );