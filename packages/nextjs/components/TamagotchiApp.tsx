import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Heart,
  Skull,
  Star,
  Play,
  RefreshCw,
} from 'lucide-react';
import TamagotchiCard, {
  TamagotchiStats,
} from './TamagotchiCard';
import RarityBadge from './RarityBadge';


const TamagotchiApp: React.FC = () => {
  const [tamagotchis, setTamagotchis] = useState<TamagotchiStats[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);

  // Carga datos de ejemplo
  useEffect(() => {
    const mockData: TamagotchiStats[] = [
      {
        id: '1',
        health: 85,
        hunger: 40,
        happiness: 70,
        rarity: 2,
        birthTime: Math.floor(Date.now() / 1000) - 86400,
        lastInteraction: Math.floor(Date.now() / 1000) - 3600,
        isAlive: true,
        owner: '0x123...',
      },
      {
        id: '2',
        health: 25,
        hunger: 85,
        happiness: 20,
        rarity: 0,
        birthTime: Math.floor(Date.now() / 1000) - 172800,
        lastInteraction: Math.floor(Date.now() / 1000) - 7200,
        isAlive: true,
        owner: '0x123...',
      },
      {
        id: '3',
        health: 0,
        hunger: 100,
        happiness: 0,
        rarity: 1,
        birthTime: Math.floor(Date.now() / 1000) - 259200,
        lastInteraction: Math.floor(Date.now() / 1000) - 86400,
        isAlive: false,
        owner: '0x123...',
      },
    ];
    setTamagotchis(mockData);
  }, []);

  const showNotification = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info'
  ) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const connectWallet = async () => {
    setIsLoading(true);
    // Simulación de conexión
    setTimeout(() => {
      setWalletConnected(true);
      setUserAddress('0x064b4880...15691');
      showNotification('Wallet conectada exitosamente', 'success');
      setIsLoading(false);
    }, 1000);
  };

  const feedTamagotchi = (id: string) => {
    setTamagotchis((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              hunger: Math.max(0, t.hunger - 30),
              health: Math.min(100, t.health + (t.hunger < 20 ? 5 : 0)),
              lastInteraction: Math.floor(Date.now() / 1000),
            }
          : t
      )
    );
    showNotification('🍎 Tamagotchi alimentado!', 'success');
  };

  const playWithTamagotchi = (id: string) => {
    setTamagotchis((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              happiness: Math.min(100, t.happiness + 25),
              hunger: Math.min(100, t.hunger + 10),
              health: Math.min(100, t.health + (t.happiness > 80 ? 3 : 0)),
              lastInteraction: Math.floor(Date.now() / 1000),
            }
          : t
      )
    );
    showNotification('🎮 Jugaste con tu Tamagotchi!', 'info');
  };

  const tickTime = (id: string) => {
    setTamagotchis((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              health: Math.max(0, t.health - 5),
              hunger: Math.min(100, t.hunger + 5),
              happiness: Math.max(0, t.happiness - 5),
              isAlive: t.health - 5 > 10 && t.hunger + 5 < 90,
              lastInteraction: Math.floor(Date.now() / 1000),
            }
          : t
      )
    );
    showNotification('⏰ Tiempo avanzado', 'info');
  };

  const refreshAllStats = () => {
    showNotification('📊 Stats actualizados', 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      {/* Notificaciones */}
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            notification.type === 'success'
              ? 'bg-green-500 text-white'
              : notification.type === 'error'
              ? 'bg-red-500 text-white'
              : notification.type === 'warning'
              ? 'bg-yellow-500 text-black'
              : 'bg-blue-500 text-white'
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🐾 Tamagotchi NFT - Starknet
            </h1>
            <p className="text-gray-600">
              Cría, alimenta y juega con tus mascotas digitales únicas
            </p>
          </div>
          {!walletConnected ? (
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {isLoading ? 'Conectando...' : 'Conectar Wallet'}
            </button>
          ) : (
            <div className="flex gap-4 items-center">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                🟢 {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
              </div>
              <button
                onClick={() => {
                  const newId = String(tamagotchis.length + 1);
                  feedTamagotchi(newId);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                🐣 Mint Tamagotchi
              </button>
              <button
                onClick={refreshAllStats}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Estadísticas generales */}
      <div className="max-w-7xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow flex items-center gap-2">
          <Trophy className="text-yellow-500" size={24} />
          <div>
            <p className="text-sm text-gray-600">Total Tamagotchis</p>
            <p className="text-2xl font-bold">{tamagotchis.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow flex items-center gap-2">
          <Heart className="text-green-500" size={24} />
          <div>
            <p className="text-sm text-gray-600">Vivos</p>
            <p className="text-2xl font-bold">
              {tamagotchis.filter((t) => t.isAlive).length}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow flex items-center gap-2">
          <Skull className="text-red-500" size={24} />
          <div>
            <p className="text-sm text-gray-600">Fallecidos</p>
            <p className="text-2xl font-bold">
              {tamagotchis.filter((t) => !t.isAlive).length}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow flex items-center gap-2">
          <Star className="text-purple-500" size={24} />
          <div>
            <p className="text-sm text-gray-600">Legendarios</p>
            <p className="text-2xl font-bold">
              {tamagotchis.filter((t) => t.rarity === 3).length}
            </p>
          </div>
        </div>
      </div>

      {/* Grid de Tamagotchis */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tamagotchis.map((t) => (
          <TamagotchiCard
            key={t.id}
            tamagotchi={t}
            onFeed={feedTamagotchi}
            onPlay={playWithTamagotchi}
            onTick={tickTime}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default TamagotchiApp;
