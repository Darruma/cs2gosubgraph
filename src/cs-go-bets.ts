import {
  BetCreated as BetCreatedEvent,
  BetExerciseConfirmed as BetExerciseConfirmedEvent,
  BetExerciseRequested as BetExerciseRequestedEvent,
  BetJoined as BetJoinedEvent,
  BetLeft as BetLeftEvent
} from "../generated/CSGoBets/CSGoBets"
import {
  BetCreated,
  BetExerciseConfirmed,
  BetExerciseRequested,
  BetJoined,
  BetLeft
} from "../generated/schema"

export function handleBetCreated(event: BetCreatedEvent): void {
  let entity = new BetCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.creator = event.params.creator
  entity.CSGoBets_id = event.params.id
  entity.strike = event.params.strike
  entity.expiry = event.params.expiry
  entity.amount = event.params.amount
  entity.greaterBet = event.params.greaterBet
  entity.itemId = event.params.itemId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBetExerciseConfirmed(
  event: BetExerciseConfirmedEvent
): void {
  let entity = new BetExerciseConfirmed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.CSGoBets_id = event.params.id
  entity.strike = event.params.strike
  entity.timestamp = event.params.timestamp
  entity.winner = event.params.winner
  entity.payout = event.params.payout
  entity.fee = event.params.fee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBetExerciseRequested(
  event: BetExerciseRequestedEvent
): void {
  let entity = new BetExerciseRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.CSGoBets_id = event.params.id
  entity.strike = event.params.strike
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBetJoined(event: BetJoinedEvent): void {
  let entity = new BetJoined(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.buyer = event.params.buyer
  entity.CSGoBets_id = event.params.id
  entity.strike = event.params.strike
  entity.expiry = event.params.expiry
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBetLeft(event: BetLeftEvent): void {
  let entity = new BetLeft(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.leaver = event.params.leaver
  entity.CSGoBets_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
