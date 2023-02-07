// const { assert, expect } = require("chai")
// const { ethers } = require("hardhat")
import { assert, expect } from "chai"
import { ethers } from "hardhat"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

describe("SimpleStorage", function () {
    let simpleStorageFactory: SimpleStorage__factory
    let simpleStorage: SimpleStorage

    beforeEach(async function () {
        simpleStorageFactory = (await ethers.getContractFactory(
            "SimpleStorage"
        )) as SimpleStorage__factory
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorte number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should add the persons name and favorite number to the map", async function () {
        const personName = "Name"
        const expectedValue = "3"
        const transactionResponse = await simpleStorage.addPerson(
            personName,
            expectedValue
        )
        await transactionResponse.wait(1)
        const favoriteNumber = await simpleStorage.nameToFavoriteNumber(
            personName
        )
        assert.equal(favoriteNumber.toString(), expectedValue)
    })
})
