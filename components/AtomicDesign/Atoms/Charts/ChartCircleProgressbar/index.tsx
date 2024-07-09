import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

//
interface ChartCircleProgressbarProps {
  label?: string;
  percentage?: number;
}

const ChartCircleProgressbar = ({
  label,
  percentage,
}: ChartCircleProgressbarProps) => (
  <>
    <div className='chartCircle-progressbar'>
      {/** Title */}
      <h6 className='chartCircle-progressbar__title'>{label}</h6>
      {/** Char */}
      <div
        style={{
          width: 150,
          height: 150,
        }}
      >
        <CircularProgressbar
          value={percentage || 0}
          text={`${percentage}%`}
          background
          backgroundPadding={5}
          styles={{
            background: {
              fill: '#FDFEFE',
            },
            trail: {
              // Trail color
              stroke: '#2a2e32',
              strokeWidth: 10,
            },
            path: {
              // Path color
              stroke: '#f7d145',
              strokeWidth: 12,
              strokeLinecap: 'butt',
            },
            text: {
              // Text color
              fill: '#27394F',
              // Text size
              fontSize: '18px',
              fontWeight: 'bold',
            },
          }}
        />
      </div>
    </div>
  </>
);

export { ChartCircleProgressbar };
