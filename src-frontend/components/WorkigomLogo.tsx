interface WorkigomLogoProps {
  className?: string;
  size?: number;
  color?: 'black' | 'white' | 'gradient';
  withText?: boolean;
}

export function WorkigomLogo({ 
  className = "", 
  size = 100, 
  color = 'gradient',
  withText = false 
}: WorkigomLogoProps) {
  const scale = size / 260;
  const bodyW = 260 * scale;
  const bodyH = 200 * scale;
  const radius = 36 * scale;
  const handleW = 120 * scale;
  const handleH = 36 * scale;
  
  // Calculate handle position
  const hx = (bodyW - handleW) / 2;
  const hy = -handleH / 2;
  
  // Heart dimensions and position
  const heartW = 90 * scale;
  const heartH = 80 * scale;
  const cx = bodyW / 2;
  const cy = bodyH / 2 - 6 * scale;
  const hw = heartW / 2;
  const hh = heartH / 2;
  const topY = cy - hh * 0.4;
  
  // Heart path
  const heartPoints = [
    [cx, cy + hh],
    [cx - hw, cy],
    [cx - hw * 0.9, topY],
    [cx - hw * 0.4, topY - hh * 0.4],
    [cx, topY],
    [cx + hw * 0.4, topY - hh * 0.4],
    [cx + hw * 0.9, topY],
    [cx + hw, cy],
  ].map(p => p.join(',')).join(' ');

  let briefcaseColor: string;
  let heartColor: string;
  
  if (color === 'black') {
    briefcaseColor = '#000000';
    heartColor = '#FFFFFF';
  } else if (color === 'white') {
    briefcaseColor = '#FFFFFF';
    heartColor = '#000000';
  } else {
    // gradient mode
    briefcaseColor = 'url(#briefcaseGradient)';
    heartColor = '#FFFFFF';
  }

  const totalWidth = withText ? bodyW + 400 * scale : bodyW;
  const totalHeight = bodyH + handleH;

  return (
    <svg
      width={totalWidth}
      height={totalHeight}
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {color === 'gradient' && (
        <defs>
          <linearGradient id="briefcaseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0367A6" />
            <stop offset="100%" stopColor="#012840" />
          </linearGradient>
        </defs>
      )}
      
      <g transform={`translate(0, ${handleH / 2})`}>
        {/* Briefcase Body */}
        <rect
          x="0"
          y="0"
          width={bodyW}
          height={bodyH}
          rx={radius}
          ry={radius}
          fill={briefcaseColor}
        />
        
        {/* Handle */}
        <rect
          x={hx}
          y={hy}
          width={handleW}
          height={handleH}
          rx={handleH / 2}
          ry={handleH / 2}
          fill={briefcaseColor}
        />
        
        {/* Heart */}
        <polygon
          points={heartPoints}
          fill={heartColor}
        />
      </g>
      
      {withText && (
        <text
          x={bodyW + 40 * scale}
          y={totalHeight / 2 + 8 * scale}
          fontSize={140 * scale}
          fontFamily="'Be Vietnam Pro', system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fill={color === 'white' ? '#FFFFFF' : '#000000'}
          dominantBaseline="middle"
        >
          workigom
        </text>
      )}
    </svg>
  );
}
