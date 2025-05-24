import React from 'react';
import {
  Heart,
  Utensils,
  Smile,
  Clock,
  Skull,
  Play,
  RefreshCw,
} from 'lucide-react';
import StatBar from  './StatBar';
import RarityBadge from  './RarityBadge';
export interface TamagotchiStats {
  id: string;
  health: number;
  hunger: number;
  happiness: number;
  rarity: number;
  birthTime: number;
  lastInteraction: number;
  isAlive: boolean;
  owner: string;
}

interface Props {
  tamagotchi: TamagotchiStats;
  onFeed(id: string): void;
  onPlay(id: string): void;
  onTick(id: string): void;
  isLoading: boolean;
}

const TamagotchiCard: React.FC<Props> = ({
  tamagotchi,
  onFeed,
  onPlay,
  onTick,
  isLoading,
}) => {
  const getHealthColor = (health: number) => {
    if (health > 70) return 'bg-green-500';
    if (health > 30) return 'bg-orange-500';
    return 'bg-red-500';
  };
  const getHungerColor = (hunger: number) => {
    if (hunger < 30) return 'bg-green-500';
    if (hunger < 70) return 'bg-orange-500';
    return 'bg-red-500';
  };
  const getHappinessColor = (happiness: number) => {
    if (happiness > 70) return 'bg-blue-500';
    if (happiness > 30) return 'bg-orange-500';
    return 'bg-red-500';
  };
  const formatTime = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleString();
  const getTimeSinceLastInteraction = () => {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - tamagotchi.lastInteraction;
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  if (!tamagotchi.isAlive) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border-2 border-gray-600 opacity-75">
        <div className="text-center">
          <Skull size={64} className="mx-auto text-red-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-300 mb-2">
            Tamagotchi #{tamagotchi.id}
          </h3>
          <p className="text-red-400 font-semibold mb-2">💀 R.I.P. 💀</p>
          <RarityBadge rarity={tamagotchi.rarity} />
          <div className="mt-4 text-sm text-gray-400">
            <p>Nació: {formatTime(tamagotchi.birthTime)}</p>
            <p>Última interacción: {formatTime(tamagotchi.lastInteraction)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            Tamagotchi #{tamagotchi.id}
          </h3>
          <RarityBadge rarity={tamagotchi.rarity} />
        </div>
        <div className="text-6xl animate-bounce">🐾</div>
      </div>
      <div className="mb-6">
        <StatBar
          label="Salud"
          value={tamagotchi.health}
          color={getHealthColor(tamagotchi.health)}
          icon={Heart}
        />
        <StatBar
          label="Hambre"
          value={tamagotchi.hunger}
          color={getHungerColor(tamagotchi.hunger)}
          icon={Utensils}
        />
        <StatBar
          label="Felicidad"
          value={tamagotchi.happiness}
          color={getHappinessColor(tamagotchi.happiness)}
          icon={Smile}
        />
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button
          onClick={() => onFeed(tamagotchi.id)}
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-3 py-2 rounded font-semibold transition-colors"
        >
          <Utensils size={16} /> Feed
        </button>
        <button
          onClick={() => onPlay(tamagotchi.id)}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-3 py-2 rounded font-semibold transition-colors"
        >
          <Play size={16} /> Play
        </button>
        <button
          onClick={() => onTick(tamagotchi.id)}
          disabled={isLoading}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-3 py-2 rounded font-semibold transition-colors"
        >
          <Clock size={16} /> Tick
        </button>
      </div>
      <div className="text-xs text-gray-500 space-y-1">
        <div className="flex items-center gap-1">
          <Clock size={12} /> Nació: {formatTime(tamagotchi.birthTime)}
        </div>
        <div className="flex items-center gap-1">
          <RefreshCw size={12} /> Última interacción:{' '}
          {getTimeSinceLastInteraction()} atrás
        </div>
      </div>
    </div>
  );
};

export default TamagotchiCard;
