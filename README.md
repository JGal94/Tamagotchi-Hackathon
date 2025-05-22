# 🐾 Tamagotchi NFT - Starknet

<div align="center">

![Tamagotchi NFT Banner](https://via.placeholder.com/800x200/FF6B6B/FFFFFF?text=🐾+Tamagotchi+NFT+🎮)

**Cría, alimenta y juega con tus mascotas digitales únicas como NFTs en Starknet**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Cairo](https://img.shields.io/badge/Cairo-1.0-orange.svg)](https://book.cairo-lang.org/)
[![Starknet](https://img.shields.io/badge/Starknet-Mainnet-blue.svg)](https://starknet.io/)
[![Scaffold-Stark](https://img.shields.io/badge/Scaffold--Stark-2.0-green.svg)](https://scaffoldstark.com/)

[🎮 Demo en Vivo](#) | [📖 Documentación](#) | [🐛 Reportar Bug](https://github.com/TU_USUARIO/tamagotchi-nft-starknet/issues) | [💡 Sugerir Feature](https://github.com/TU_USUARIO/tamagotchi-nft-starknet/issues)

</div>

## 📖 Tabla de Contenidos

- [✨ Características](#-características)
- [🎮 Demo](#-demo)
- [🚀 Inicio Rápido](#-inicio-rápido)
- [📦 Instalación](#-instalación)
- [🎯 Uso](#-uso)
- [🏗️ Arquitectura](#️-arquitectura)
- [📊 Smart Contract](#-smart-contract)
- [🎨 Frontend](#-frontend)
- [🧪 Testing](#-testing)
- [🚀 Deploy](#-deploy)
- [🔧 Troubleshooting](#-troubleshooting)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)

## ✨ Características

### 🎮 Mecánicas de Juego
- **🐣 Mint Tamagotchis**: Crea mascotas digitales únicas como NFTs
- **🍎 Sistema de Alimentación**: Reduce el hambre de tu mascota
- **🎯 Sistema de Juego**: Aumenta la felicidad jugando
- **📊 Stats Dinámicos**: Salud, hambre y felicidad que cambian con el tiempo
- **⏰ Decaimiento Temporal**: Stats se deterioran sin cuidado
- **💀 Sistema de Muerte**: Mascotas pueden morir por descuido

### 🎨 Características NFT
- **🏆 Sistema de Rareza**: Común (50%), Raro (30%), Épico (15%), Legendario (5%)
- **🔗 ERC-721 Completo**: Transferible, aprobable, compatible con marketplaces
- **🌐 Metadata Dinámica**: URIs que reflejan el estado actual
- **🎪 Eventos Completos**: Todos los eventos trackeable para UIs

### 🏗️ Tecnología
- **⚡ Starknet**: Tecnología Layer 2 con costos ultra-bajos
- **🛡️ Cairo 1.0**: Lenguaje de contratos inteligentes seguro
- **🎨 Scaffold-Stark**: Framework de desarrollo moderno
- **⚛️ Next.js**: Frontend responsivo y rápido
- **🔷 TypeScript**: Tipado estático para mayor seguridad

## 🎮 Demo

### 🖼️ Capturas de Pantalla

<div align="center">

| Mint Tamagotchi | Feed & Play | Stats Dashboard |
|:---:|:---:|:---:|
| ![Mint](https://via.placeholder.com/250x200/4ECDC4/FFFFFF?text=🐣+Mint) | ![Feed](https://via.placeholder.com/250x200/45B7D1/FFFFFF?text=🍎+Feed) | ![Stats](https://via.placeholder.com/250x200/F7DC6F/FFFFFF?text=📊+Stats) |

</div>

### 🎥 Video Demo
[Ver Demo en YouTube](#) | [Probar Demo en Vivo](#)


## 📦 Instalación

### Opción 1: 🐳 Con Docker (Recomendado)

**Requisitos mínimos:**
- Docker Desktop
- Git
- VSCode con la extencion Dev Container


```bash
# 1. Clonar el repositorio
git clone https://github.com/JGal94/Tamagotchi-Hackathon
cd tamagotchi_nft

# 2. Abrir en Dev Container (VSCode)
code .
# Command Palette (Ctrl+Shift+P) > "Dev Containers: Reopen in Container"


# 3. Verificar instalación
yarn --version
scarb --version
snforge --version
```


#### Instalar Proyecto

```bash
# Clonar y setup
git clone https://github.com/JGal94/Tamagotchi-Hackathon
cd tamagotchi_nft
yarn install

# Verificar que todo esté instalado correctamente
yarn build
```

## 🎯 Uso

### 🏃‍♂️ Ejecutar el Proyecto

```bash
# Método 1: Comandos separados (recomendado para desarrollo)
# Terminal 1: Arrancar blockchain local
yarn chain

# Terminal 2: Deploy contratos
yarn deploy 

# Terminal 3: Arrancar frontend
yarn start

# Método 2: Todo en uno (experimental)
yarn dev
```

### 🌐 Acceder a la Aplicación

1. **Frontend**: http://localhost:3000
2. **Devnet**: http://localhost:5050
3. **Starknet Explorer**: http://localhost:5050/explorer

### 🎮 Primeros Pasos

1. **Conectar Wallet**: Usa una cuenta del devnet pre-creada
2. **Mint Tamagotchi**: Crea tu primera mascota NFT
3. **Alimentar**: Click en "Feed" para reducir hambre
4. **Jugar**: Click en "Play" para aumentar felicidad
5. **Monitorear**: Observa cómo cambian los stats

### 🔑 Cuentas de Prueba

El devnet crea automáticamente cuentas con fondos:

```
Account 1: 0x064b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691
Private Key: 0x71d7bb07b9a64f6f78ac4c816aff4da9

Account 2: 0x078662e7352d062084b0010068b99288486c2d8b914f6e2a55ce945f8792c8b1
Private Key: 0xe1406455b7d66b1690803be066cbe5e
```

## 🏗️ Arquitectura

```
tamagotchi-nft-starknet/
├── 📁 packages/
│   ├── 🏗️ snfoundry/           # Smart contracts
│   │   ├── contracts/
│   │   │   ├── src/
│   │   │   │   ├── lib.cairo
│   │   │   │   └── YourContract.cairo
│   │   │   └── Scarb.toml
│   │   └── scripts-ts/         # Deploy scripts
│   └── 🎨 nextjs/              # Frontend
│       ├── app/
│       ├── components/
│       ├── contracts/          # ABIs generados
│       └── hooks/              # React hooks
├── 🐳 .devcontainer/           # Docker setup
├── 📝 README.md
└── 📦 package.json
```

## 📊 Smart Contract

### 🔧 Funciones Principales

```cairo
// 🐣 Crear Tamagotchi
mint_tamagotchi(to: ContractAddress) -> u256

// 🎮 Interacciones
feed_tamagotchi(token_id: u256)        // Alimentar (-30 hambre)
play_with_tamagotchi(token_id: u256)   // Jugar (+25 felicidad)
tick_time(token_id: u256)              // Activar decaimiento

// 📊 Consultas
get_tamagotchi_stats(token_id: u256) -> (health, hunger, happiness, rarity, birth_time, last_interaction, is_alive)
is_alive(token_id: u256) -> bool
get_tamagotchi_rarity(token_id: u256) -> u8
```

### 🎲 Sistema de Rareza

| Rareza | Probabilidad | Valor |
|--------|--------------|-------|
| 🟢 Común | 50% | 0 |
| 🔵 Raro | 30% | 1 |
| 🟣 Épico | 15% | 2 |
| 🟡 Legendario | 5% | 3 |

### ⚡ Mecánicas de Juego

```
📊 Stats (0-100):
├── 💚 Salud: Bienestar general
├── 🍎 Hambre: 0=lleno, 100=hambriento
└── 😊 Felicidad: 0=triste, 100=feliz

⏰ Decaimiento Temporal:
├── Cada hora sin interacción: -5 stats
├── Hambre aumenta +5 cada hora
└── Muerte si Salud ≤ 10 o Hambre ≥ 90

🎮 Interacciones:
├── Feed: -30 hambre, +5 salud (si hambre < 20)
├── Play: +25 felicidad, +10 hambre, +3 salud (si felicidad > 80)
└── Tick: Activa decaimiento manual
```

### 📡 Eventos

```cairo
TamagotchiBorn(token_id, owner, rarity, birth_time)
TamagotchiFed(token_id, owner, new_hunger, timestamp)
TamagotchiPlayed(token_id, owner, new_happiness, timestamp)
TamagotchiDied(token_id, owner, cause, timestamp)
StatsDecayed(token_id, health, hunger, happiness, timestamp)
```

## 🎨 Frontend

### 🔗 Tecnologías Utilizadas

- **⚛️ Next.js 14**: App Router con SSR
- **🎨 Tailwind CSS**: Estilos utilitarios
- **🔗 Starknet-React**: Hooks para Starknet
- **📊 Recharts**: Gráficos de stats
- **🎭 Framer Motion**: Animaciones suaves

### 🎣 Hooks Personalizados

```typescript
// Hooks disponibles para desarrolladores
useScaffoldContract()     // Acceso al contrato
useScaffoldReadContract() // Leer datos del contrato
useScaffoldWriteContract() // Escribir al contrato
useDeployedContractInfo() // Información del contrato
useTamagotchiStats()     // Stats específicos del Tamagotchi
```

### 🎨 Componentes

```
components/
├── 🎮 TamagotchiCard/    # Tarjeta individual
├── 📊 StatsBar/          # Barra de estadísticas
├── 🎯 ActionButtons/     # Botones Feed/Play
├── 🏆 RarityBadge/       # Indicador de rareza
└── 💀 DeathModal/        # Modal de muerte
```

## 🧪 Testing

### 🏃‍♂️ Ejecutar Tests

```bash
# Tests de Smart Contract
cd packages/snfoundry/contracts
snforge test

# Tests de Frontend
cd packages/nextjs
yarn test

# Tests End-to-End
yarn test:e2e

# Coverage
yarn test:coverage
```

### 🧪 Casos de Prueba

```cairo
// Ejemplos de tests incluidos
test_mint_tamagotchi()           // ✅ Mint básico
test_feed_reduces_hunger()       // ✅ Alimentar funciona
test_play_increases_happiness()  // ✅ Jugar funciona
test_stats_decay_over_time()     // ✅ Decaimiento temporal
test_death_by_starvation()       // ✅ Muerte por hambre
test_death_by_poor_health()      // ✅ Muerte por salud
test_rarity_distribution()       // ✅ Rareza aleatoria
test_erc721_compliance()         // ✅ Estándar ERC721
```

## 🚀 Deploy

### 🏠 Deploy Local (Devnet)

```bash
# Arrancar devnet
yarn chain

# Deploy con reset (limpia deployments anteriores)
yarn deploy --network devnet --reset

# Verificar deployment
yarn verify --network devnet
```

### 🌐 Deploy a Testnet (Sepolia)

```bash
# 1. Configurar .env
cp .env.example .env
# Editar .env con tu private key y RPC URL

# 2. Deploy a Sepolia
yarn deploy --network sepolia

# 3. Verificar en Starkscan
echo "Contrato deployado en: https://sepolia.starkscan.co/contract/YOUR_CONTRACT_ADDRESS"
```

### 🏛️ Deploy a Mainnet

```bash
# ⚠️ SOLO PARA PRODUCCIÓN
yarn deploy --network mainnet

# Verificar en Starkscan Mainnet
echo "Contrato en mainnet: https://starkscan.co/contract/YOUR_CONTRACT_ADDRESS"
```

### 🔍 Verificación de Contratos

```bash
# Verificar código fuente en Starkscan
yarn verify --network sepolia
yarn verify --network mainnet
```

## 🔧 Troubleshooting

### ❓ Problemas Comunes

#### 🚫 Error: "Contract not found"

```bash
# Solución: Redeployar contratos
yarn deploy --network devnet --reset
```

#### 🌐 Error: "Network not available"

```bash
# Solución: Reiniciar devnet
yarn chain:stop
yarn chain:start
```

#### 🔨 Error de compilación

```bash
# Solución: Limpiar y rebuildir
yarn clean
scarb build
```

#### 🐳 Error: Docker no encuentra el comando

```bash
# Solución: Reiniciar Dev Container
# Command Palette > "Dev Containers: Rebuild Container"
```

#### 💸 Error: "Insufficient funds"

```bash
# Solución: Usar cuenta con fondos del devnet
# Ver sección "Cuentas de Prueba" arriba
```

### 🆘 Obtener Ayuda

1. **📚 Documentación**: [Scaffold-Stark Docs](https://scaffoldstark.com/docs)
2. **💬 Discord**: [Unirse al Discord de Starknet](https://discord.gg/starknet)


### 🔍 Logs y Debugging

```bash
# Ver logs del devnet
yarn logs

# Ver logs detallados
yarn logs --verbose

# Debuggear transacciones
yarn tx:debug <TRANSACTION_HASH>

# Inspeccionar estado del contrato
yarn contract:inspect <CONTRACT_ADDRESS>
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Aquí te explicamos cómo participar:

### 🚀 Empezar a Contribuir

1. 🍴 **Fork** el repositorio
2. 🌿 **Crear rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. 💾 **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. 📤 **Push** a la rama (`git push origin feature/AmazingFeature`)
5. 🔄 **Abrir Pull Request**

### 📝 Guías de Contribución

#### 🐛 Reportar Bugs

```markdown
**Describe el bug**
Una descripción clara y concisa del bug.

**Para Reproducir**
Pasos para reproducir el comportamiento:
1. Ve a '...'
2. Click en '....'
3. Scroll down to '....'
4. Ver error

**Comportamiento Esperado**
Qué esperabas que pasara.

**Screenshots**
Si aplica, agrega screenshots.

**Información del Sistema:**
 - OS: [e.g. iOS]
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]
```

#### ✨ Sugerir Features

```markdown
**¿Tu feature está relacionada con un problema? Describe.**
Una descripción clara y concisa del problema.

**Describe la solución que te gustaría**
Una descripción clara y concisa de lo que quieres que pase.

**Describe alternativas que hayas considerado**
Una descripción clara y concisa de alternativas que hayas considerado.

**Contexto adicional**
Agrega cualquier otro contexto o screenshots sobre la feature.
```

### 👥 Tipos de Contribuciones

- 🐛 **Bug Fixes**: Corregir errores
- ✨ **Features**: Nuevas funcionalidades
- 📚 **Documentación**: Mejorar docs
- 🎨 **UI/UX**: Mejoras visuales
- ⚡ **Performance**: Optimizaciones
- 🧪 **Tests**: Agregar/mejorar tests



## 📊 Estadísticas del Proyecto

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/JGal94/Tamagotchi-Hackathon?style=social)
![GitHub forks](https://img.shields.io/github/forks/JGal94/Tamagotchi-Hackathon?style=social)
![GitHub issues](https://img.shields.io/github/issues/JGal94/Tamagotchi-Hackathon)
![GitHub pull requests](https://img.shields.io/github/issues-pr/JGal94/Tamagotchi-Hackathon)

</div>

## 🗺️ Roadmap

### 🎯 Próximas Features

- [ ] 🏪 **Marketplace**: Compra/venta de Tamagotchis
- [ ] 🎮 **Batallas**: Combate entre Tamagotchis
- [ ] 🧬 **Breeding**: Cruzar Tamagotchis para crear nuevos
- [ ] 🏆 **Achievements**: Sistema de logros
- [ ] 📱 **Mobile App**: Aplicación móvil nativa
- [ ] 🎨 **Custom Avatars**: Personalización visual
- [ ] 🌍 **Metaverse Integration**: Integración con mundos virtuales

### 📅 Timeline

- **Q2 2024**: Marketplace y Batallas
- **Q3 2024**: Breeding y Achievements
- **Q4 2024**: Mobile App y Custom Avatars

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2024 JGal94

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Agradecimientos

- **🏗️ [Scaffold-Stark](https://scaffoldstark.com/)** - Framework increíble para desarrollo en Starknet
- **🛡️ [OpenZeppelin](https://openzeppelin.com/)** - Contratos seguros y auditados
- **⚡ [Starknet](https://starknet.io/)** - Por la tecnología Layer 2 increíble
- **🔷 [Cairo](https://book.cairo-lang.org/)** - Lenguaje de contratos inteligentes seguro
- **🎨 [Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitarian
- **⚛️ [Next.js](https://nextjs.org/)** - Framework React para producción

## 🌐 Enlaces Útiles



---

<div align="center">

**Hecho con ❤️ para la comunidad Starknet**

⭐ **¡Dale una estrella si este proyecto te ayudó!** ⭐

</div>