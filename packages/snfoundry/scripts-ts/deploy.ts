import {
  deployContract,
  executeDeployCalls,
  exportDeployments,
  deployer,
} from "./deploy-contract";
import { green } from "./helpers/colorize-log";

/**
 * Deploy a contract using the specified parameters.
 */
const deployScript = async (): Promise<void> => {
  await deployContract({
    contract: "YourContract",
    constructorArgs: {
      owner: deployer.address,
      name: "Tamagotchi NFT Collection",
      symbol: "TAMA",
      base_uri: "https://api.tamagotchi.game/metadata/"
    },
  });
};

const main = async (): Promise<void> => {
  try {
    console.log("🚀 Deploying Tamagotchi Contract...");
    await deployScript();
    await executeDeployCalls();
    exportDeployments();

    console.log(green("✅ Tamagotchi Contract Deployed Successfully!"));
    console.log(green("🎮 Ready to mint your first Tamagotchi!"));
  } catch (err) {
    console.log("❌ Error:", err);
    process.exit(1);
  }
};

main();