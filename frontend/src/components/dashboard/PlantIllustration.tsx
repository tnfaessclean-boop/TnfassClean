export default function PlantIllustration({ className = 'w-32 h-32' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg" fill="none">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      <g transform="translate(10,10)">
        <path d="M50 80 C20 70 10 50 30 40 C50 30 60 20 70 10" stroke="url(#g1)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.95" />
        <path d="M60 60 C80 50 90 30 70 20 C60 14 55 10 50 20" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.95" />
        <ellipse cx="20" cy="60" rx="8" ry="14" fill="#bbf7d0" opacity="0.9" />
        <ellipse cx="40" cy="50" rx="10" ry="18" fill="#86efac" opacity="0.95" />
      </g>
    </svg>
  )
}
