interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}

export default function Logo({ iconOnly = false, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      // Mở rộng viewBox để chữ "SANCHOUKU" có đủ không gian hiển thị
      viewBox={`0 0 ${iconOnly ? '48 26' : '180 28'}`}
      {...props}
    >
      {/* Phần Icon được giữ nguyên */}
      <rect
        width="10.16"
        height="19.93"
        fill="currentColor"
        rx="5.08"
        transform="rotate(29.49 -5.18 20.77) skewX(.85)"
      />
      <rect
        width="10.16"
        height="25.62"
        fill="currentColor"
        rx="5.08"
        transform="matrix(.87 .492 -.48 .878 27.17 0)"
      />
      <rect
        width="10.16"
        height="10.25"
        fill="currentColor"
        opacity=".5"
        rx="5.08"
        transform="rotate(29.49 -8.24 75.34) skewX(.85)"
      />

      {/* Phần chữ SANCHOUKU */}
      {!iconOnly && (
        <text
          x="50"
          y="21"
          fill="currentColor"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="18"
          fontWeight="bold"
          letterSpacing="0.5"
        >
          SANCHOUKU
        </text>
      )}
    </svg>
  );
}