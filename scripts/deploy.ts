const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const taxFee = 5;
  const contract = await hre.ethers.deployContract('BlockPledge', [taxFee]);

  await contract.waitForDeployment();

  // Write contract address to contractAddress.json
  const address = JSON.stringify({ address: contract.target }, null, 4);

  fs.writeFile('./app/abis/contractAddress.json', address, 'utf8', (err: Error) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  console.log(`Smart Contract deployed at address ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
