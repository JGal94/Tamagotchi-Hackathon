import { contract } from "../contracts/starknet";

// 🐣 Mint Tamagotchi
export async function mintTamagotchi(to: string) {
  const tx = await contract.invoke("mint_tamagotchi", [to]);
  return tx.transaction_hash;
}

// 🍎 Alimentar Tamagotchi
export async function feedTamagotchi(token_id: string) {
  const tx = await contract.invoke("feed_tamagotchi", [token_id]);
  return tx.transaction_hash;
}

// 🎯 Jugar con Tamagotchi
export async function playTamagotchi(token_id: string) {
  const tx = await contract.invoke("play_with_tamagotchi", [token_id]);
  return tx.transaction_hash;
}

// ⏰ Decaimiento manual
export async function decayTamagotchi(token_id: string) {
  const tx = await contract.invoke("tick_time", [token_id]);
  return tx.transaction_hash;
}

// 📊 Obtener stats
export async function getStats(token_id: string) {
  const result = await contract.call("get_tamagotchi_stats", [token_id]) as any[];

  return {
    health: Number(result[0]),
    hunger: Number(result[1]),
    happiness: Number(result[2]),
    rarity: Number(result[3]),
    birth_time: Number(result[4]),
    last_interaction: Number(result[5]),
    is_alive: Boolean(result[6])
  };
}

// 💀 Verificar si está vivo
export async function isAlive(token_id: string) {
  const result = await contract.call("is_alive", [token_id]) as any[];
  return Boolean(result[0]);
}

// 🏆 Obtener rareza
export async function getRarity(token_id: string) {
  const result = await contract.call("get_tamagotchi_rarity", [token_id]) as any[];
  return Number(result[0]);
}
