const main = async () => {
    // Get contract owner address and random person address
    const [owner, randomPerson, randomPersonTwo, randomPersonThree] = await hre.ethers.getSigners();
    // Import and compile smart contract WavePortal.sol
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // Deploy the contract
    const waveContract =  await waveContractFactory.deploy();
    await waveContract.deployed(); // Wait until the deploy be completed!

    console.log("Contract deployed to: ", waveContract.address);
    console.log("Contract deployed by: ", owner.address);

    // Read total waves
    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    // Add new wave
    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    // Read total waves again
    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    for(var i=1; i<=2; i++) {
        waveTxn = await waveContract.connect(randomPersonTwo).wave();
        await waveTxn.wait();
    }

    waveTxn = await waveContract.connect(randomPersonThree).wave();
    await waveTxn.wait();

    
    waveCount = await waveContract.getTotalWaves();

    let wavedMost;
    wavedMost = await waveContract.getPersonWavedMost();
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();