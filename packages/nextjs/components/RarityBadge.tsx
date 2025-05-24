import React from 'react';

const RARITY_NAMES = ['Común', 'Raro', 'Épico', 'Legendario'];
const RARITY_COLORS: Record<number, string> = {
  0: 'bg-gray-500',
  1: 'bg-blue-500',
  2: 'bg-purple-500',
  3: 'bg-yellow-500',
};
const RARITY_EMOJIS: Record<number, string> = {
  0: '🟢',
  1: '🔵',
  2: '🟣',
  3: '🟡',
};

interface Props {
  rarity: number;
}

const RarityBadge: React.FC<Props> = ({ rarity }) => (
  <div
    className={`
      inline-flex items-center gap-1
      px-2 py-1 rounded-full
      text-white text-xs font-bold
      ${RARITY_COLORS[rarity] || RARITY_COLORS[0]}
    `}
  >
    <span>{RARITY_EMOJIS[rarity] || RARITY_EMOJIS[0]}</span>
    {RARITY_NAMES[rarity] || RARITY_NAMES[0]}
  </div>
);

export default RarityBadge;
