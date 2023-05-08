import { BigInt } from "@graphprotocol/graph-ts";
import { Bet, Stats, User } from "../generated/schema";
export const BIGINT_ZERO = BigInt.fromI32(0);
export const BIGINT_ONE = BigInt.fromI32(1);

export const getLoserFromBet = (bet: Bet, winner: string): User | null => {
  if (bet.buyer) {
    let creator = User.load(bet.creator);
    let buyer = User.load(bet.buyer as string);
    if (creator && buyer) {
      if (creator.id == winner) {
        return buyer as User;
      } else {
        return creator as User;
      }
    }
    return null;
  }
  return null;
};

export const getStats = (): Stats => {
  return getOrCreateStats();
};
export const getOrCreateUser = (id: string): User => {
  let user = User.load(id);
  if (user == null) {
    user = new User(id);
    user.wins = BIGINT_ZERO;
    user.losses = BIGINT_ZERO;
    user.pnl = BIGINT_ZERO;
    let stats = getStats();
    stats.totalUsers = stats.totalUsers.plus(BIGINT_ONE);
    stats.save();
    user.save();
  }

  return user as User;
};

export const updatePnl = (user: User, amount: BigInt): void => {
  user.pnl = user.pnl.plus(amount);
  user.save();
};
export const getOrCreateBet = (id: string): Bet => {
  let bet = Bet.load(id);
  if (bet == null) {
    bet = new Bet(id);
    bet.betAmount = BIGINT_ZERO;
    bet.strike = BIGINT_ZERO;
    bet.expiry = BIGINT_ZERO;
    bet.betID = BIGINT_ZERO;
    bet.requestExercise = false;
    bet.creator = "";
    bet.greaterBet = false;
    bet.exercised = false;
    bet.save();
  }
  return bet as Bet;
};
export function getOrCreateStats(): Stats {
  let stats = Stats.load("stats");
  if (stats == null) {
    stats = new Stats("stats");
    stats.totalBets = BIGINT_ZERO;
    stats.totalFees = BIGINT_ZERO;
    stats.totalUsers = BIGINT_ZERO;
    stats.totalAmount = BIGINT_ZERO;
    stats.save();
  }
  return stats as Stats;
}
