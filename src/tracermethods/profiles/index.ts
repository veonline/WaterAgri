import { profile as bologna } from "./bologna";
import { profile as danzica } from "./danzica";
import { profile as debrecen } from "./debrecen";
import { profile as innsbruk } from "./innsbruk";
import { profile as oulu } from "./oulu";
import { profile as venice } from "./venice";

export const profiles: Record<string, Record<string, any>> = {
  bologna,
  danzica,
  debrecen,
  innsbruk,
  oulu,
  venice
}