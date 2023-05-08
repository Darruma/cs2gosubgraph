import {
  BetCreated as BetCreatedEvent,
  BetExerciseConfirmed as BetExerciseConfirmedEvent,
  BetExerciseRequested as BetExerciseRequestedEvent,
  BetJoined as BetJoinedEvent,
  BetLeft as BetLeftEvent,
} from "../generated/CSGoBets/CSGoBets";
import { BetLeft } from "../generated/schema";
import {
  BIGINT_ONE,
  getLoserFromBet,
  getOrCreateBet,
  getOrCreateUser,
  getStats,
} from "./schema";

export function handleBetCreated(event: BetCreatedEvent): void {
  let user = getOrCreateUser(event.params.creator.toHexString());
  let bet = getOrCreateBet(event.params.id.toHexString());
  bet.creator = user.id;
  bet.strike = event.params.strike;
  bet.betID = event.params.id;
  bet.expiry = event.params.expiry;
  bet.betAmount = event.params.amount;
  bet.greaterBet = event.params.greaterBet;
  bet.exercised = false;
  bet.itemID = event.params.itemId;
  bet.requestExercise = false;
  bet.save();
}

export function handleBetExerciseConfirmed(
  event: BetExerciseConfirmedEvent
): void {
  let bet = getOrCreateBet(event.params.id.toHexString());
  let winner = getOrCreateUser(event.params.winner.toHexString());
  let loser = getLoserFromBet(bet, winner.id);
  let stats = getStats();
  if (loser) {
    loser.losses = loser.losses.plus(BIGINT_ONE);
    loser.pnl = loser.pnl.minus(event.params.payout);
    winner.wins = winner.wins.plus(BIGINT_ONE);
    winner.pnl = winner.pnl.plus(event.params.payout);
    stats.totalFees = stats.totalFees.plus(event.params.fee);
    stats.totalAmount = stats.totalAmount.plus(event.params.payout);
    bet.exercised = true;
    bet.winner = winner.id;
    bet.save();
    winner.save();
    loser.save();
    stats.save();
  }
}

export function handleBetExerciseRequested(
  event: BetExerciseRequestedEvent
): void {
  let bet = getOrCreateBet(event.params.id.toHexString());
  bet.requestExercise = true;
  bet.save();
}

export function handleBetJoined(event: BetJoinedEvent): void {
  let user = getOrCreateUser(event.params.buyer.toHexString());
  let bet = getOrCreateBet(event.params.id.toHexString());
  bet.buyer = user.id;
  bet.save();
}

export function handleBetLeft(event: BetLeftEvent): void {
  let entity = new BetLeft(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.save();
}
