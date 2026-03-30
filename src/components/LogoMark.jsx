function LogoMark({ className = '', label = 'JVL' }) {
  return (
    <svg
      viewBox="0 0 160 60"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <text
        x="50%"
        y="45"
        fill="currentColor"
        fontFamily="'Poppins', sans-serif"
        fontWeight="700"
        fontSize="42"
        letterSpacing="-6"
        textAnchor="middle"
      >
        {label}
      </text>
    </svg>
  )
}

export default LogoMark
