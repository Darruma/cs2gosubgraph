import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { BetCreated } from "../generated/schema"
import { BetCreated as BetCreatedEvent } from "../generated/CSGoBets/CSGoBets"
import { handleBetCreated } from "../src/cs-go-bets"
import { createBetCreatedEvent } from "./cs-go-bets-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let creator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let id = BigInt.fromI32(234)
    let strike = BigInt.fromI32(234)
    let expiry = BigInt.fromI32(234)
    let amount = BigInt.fromI32(234)
    let greaterBet = "boolean Not implemented"
    let itemId = BigInt.fromI32(234)
    let newBetCreatedEvent = createBetCreatedEvent(
      creator,
      id,
      strike,
      expiry,
      amount,
      greaterBet,
      itemId
    )
    handleBetCreated(newBetCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BetCreated created and stored", () => {
    assert.entityCount("BetCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BetCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BetCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "strike",
      "234"
    )
    assert.fieldEquals(
      "BetCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "expiry",
      "234"
    )
    assert.fieldEquals(
      "BetCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "BetCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "greaterBet",
      "boolean Not implemented"
    )
    assert.fieldEquals(
      "BetCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "itemId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
