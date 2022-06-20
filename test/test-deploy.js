const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", () => {
  let simpleStorageFactory
  let simpleStorage
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    assert.equal(currentValue.toString(), expectedValue)
  })

  it("Shoudl update whe we call the store function", async () => {
    const expectedValue = "8"
    const transactionResponse = await simpleStorage.store(8)
    const updatedValue = await simpleStorage.retrieve()
    assert.equal(updatedValue.toString(), expectedValue)
  })

  it("Should save a person's name and that person's favorite number", async () => {
    const name = "Andrei"
    const favNumber = 10
    const transactionResponse = await simpleStorage.addPerson(name, favNumber)
    const personFavNumber = await simpleStorage.nameToFavoriteNumber(name)
    assert.equal(personFavNumber.toString(), favNumber.toString())
    const people = await simpleStorage.people(0)
    assert.equal(people.name, name)
    assert.equal(people.favoriteNumber.toString(), favNumber.toString())
  })
})