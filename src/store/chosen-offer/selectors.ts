import {ChosenOffer, State} from '@/types/state.ts';
import {NameSpace} from '@/constants/namespaces.ts';

export const getChosenOffer = (state: State): ChosenOffer => state[NameSpace.ChosenOffer];
