import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BetCreated,
  BetExerciseConfirmed,
  BetExerciseRequested,
  BetJoined,
  BetLeft
} from "../generated/CSGoBets/CSGoBets"

export function createBetCreatedEvent(
  creator: Address,
  id: BigInt,
  strike: BigInt,
  expiry: BigInt,
  amount: BigInt,
  greaterBet: boolean,
  itemId: BigInt
): BetCreated {
  let betCreatedEvent = changetype<BetCreated>(newMockEvent())

  betCreatedEvent.parameters = new Array()

  betCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  betCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  betCreatedEvent.parameters.push(
    new ethereum.EventParam("strike", ethereum.Value.fromUnsignedBigInt(strike))
  )
  betCreatedEvent.parameters.push(
    new ethereum.EventParam("expiry", ethereum.Value.fromUnsignedBigInt(expiry))
  )
  betCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  betCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "greaterBet",
      ethereum.Value.fromBoolean(greaterBet)
    )
  )
  betCreatedEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )

  return betCreatedEvent
}

export function createBetExerciseConfirmedEvent(
  id: BigInt,
  strike: BigInt,
  timestamp: BigInt,
  winner: Address,
  payout: BigInt,
  fee: BigInt
): BetExerciseConfirmed {
  let betExerciseConfirmedEvent = changetype<BetExerciseConfirmed>(
    newMockEvent()
  )

  betExerciseConfirmedEvent.parameters = new Array()

  betExerciseConfirmedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  betExerciseConfirmedEvent.parameters.push(
    new ethereum.EventParam("strike", ethereum.Value.fromUnsignedBigInt(strike))
  )
  betExerciseConfirmedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  betExerciseConfirmedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )
  betExerciseConfirmedEvent.parameters.push(
    new ethereum.EventParam("payout", ethereum.Value.fromUnsignedBigInt(payout))
  )
  betExerciseConfirmedEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )

  return betExerciseConfirmedEvent
}

export function createBetExerciseRequestedEvent(
  id: BigInt,
  strike: BigInt,
  timestamp: BigInt
): BetExerciseRequested {
  let betExerciseRequestedEvent = changetype<BetExerciseRequested>(
    newMockEvent()
  )

  betExerciseRequestedEvent.parameters = new Array()

  betExerciseRequestedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  betExerciseRequestedEvent.parameters.push(
    new ethereum.EventParam("strike", ethereum.Value.fromUnsignedBigInt(strike))
  )
  betExerciseRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return betExerciseRequestedEvent
}

export function createBetJoinedEvent(
  buyer: Address,
  id: BigInt,
  strike: BigInt,
  expiry: BigInt,
  amount: BigInt
): BetJoined {
  let betJoinedEvent = changetype<BetJoined>(newMockEvent())

  betJoinedEvent.parameters = new Array()

  betJoinedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  betJoinedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  betJoinedEvent.parameters.push(
    new ethereum.EventParam("strike", ethereum.Value.fromUnsignedBigInt(strike))
  )
  betJoinedEvent.parameters.push(
    new ethereum.EventParam("expiry", ethereum.Value.fromUnsignedBigInt(expiry))
  )
  betJoinedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return betJoinedEvent
}

export function createBetLeftEvent(leaver: Address, id: BigInt): BetLeft {
  let betLeftEvent = changetype<BetLeft>(newMockEvent())

  betLeftEvent.parameters = new Array()

  betLeftEvent.parameters.push(
    new ethereum.EventParam("leaver", ethereum.Value.fromAddress(leaver))
  )
  betLeftEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return betLeftEvent
}
