import React from 'react';

interface Props {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
  icon: React.ComponentType<{ size: number; className: string }>;
}

const StatBar: React.FC<Props> = ({ label, value, maxValue = 100, color, icon: Icon }) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Icon size={16} className={color} />
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <span className="text-sm text-gray-600">{value}/{maxValue}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            color.includes('red') ? 'bg-red-500' :
            color.includes('orange') ? 'bg-orange-500' :
            color.includes('green') ? 'bg-green-500' :
            color.includes('blue') ? 'bg-blue-500' : 'bg-gray-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default StatBar;