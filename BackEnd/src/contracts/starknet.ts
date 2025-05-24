import { RpcProvider, Account, Contract, json } from "starknet";
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const STARKNET_PROVIDER_URL = process.env.STARKNET_PROVIDER_URL!;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;

// Cargar el ABI del contrato
const abi = json.parse(fs.readFileSync("src/contracts/abi/tamagotchi_abi.json", "utf-8"));

// Inicializar provider (Devnet local o testnet)
const provider = new RpcProvider({ nodeUrl: STARKNET_PROVIDER_URL });

// Crear instancia de la cuenta
const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY);

// Crear instancia del contrato
const contract = new Contract(abi, CONTRACT_ADDRESS, provider);
contract.connect(account);

export { provider, account, contract };
