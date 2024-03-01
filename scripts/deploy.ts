const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const taxFee = 5;
  const contract = await hre.ethers.deployContract('BlockPledge', [taxFee]);

  await contract.waitForDeployment();

  // Write contract address to contractAddress.json
  fs.writeFile(
    './app/abis/contractAddress.json',
    contract.target,
    'utf8',
    (err: Error) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );

  // Write contract ABI to BlockPledge.json
  // fs.writeFile(
  //   './app/abis/BlockPledge.json',
  //   JSON.stringify(contract.interface, null, 2),
  //   'utf8',
  //   (err: Error) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //   }
  // );

  console.log(`Smart Contract deployed at address ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
