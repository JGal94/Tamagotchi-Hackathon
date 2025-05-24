'use client';

import { useEffect, useState } from 'react';
import { connect } from 'starknetkit';
import axios from 'axios';
import Image from 'next/image';

export default function Home() {
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);
  const [mood, setMood] = useState<'happy' | 'sad'>('happy');
  const [account, setAccount] = useState<string | null>(null);

  const fetchEthPrice = async () => {
    const res = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    );
    const price = res.data.ethereum.usd;

    if (ethPrice !== null) {
      setMood(price > ethPrice ? 'happy' : 'sad');
    }
    setPreviousPrice(ethPrice);
    setEthPrice(price);
  };

const connectWallet = async () => {
  const { wallet } = await connect();
  if (wallet && wallet.selectedAddress) {
    setAccount(wallet.selectedAddress);
  }
};


  useEffect(() => {
    fetchEthPrice();
    const interval = setInterval(fetchEthPrice, 60000);
    return () => clearInterval(interval);
  }, [ethPrice]);

  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🐶 Mascota Ethereum</h1>
      <p>La mascota se pone feliz o triste según el precio de ETH</p>

      {account ? (
        <p>Conectado como: {account}</p>
      ) : (
        <button onClick={connectWallet}>Conectar Wallet</button>
      )}

      <div>
        <p>Precio actual: ${ethPrice}</p>
        <Image
          src={mood === 'happy' ? '/happy.png' : '/sad.png'}
          alt={mood}
          width={200}
          height={200}
        />
        <p>{mood === 'happy' ? '¡Estoy feliz! 😊' : 'Estoy triste... 😢'}</p>
      </div>
    </main>
  );
}

