import {State} from '@/types/state';
import {Url} from '@/types/api.ts';
import {AuthorizationStatus} from '@/constants/auth-status.ts';
import {NameSpace} from '@/constants/namespaces.ts';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getEmail = (state: State): string | undefined => state[NameSpace.User].email;
export const getAvatarUrl = (state: State): Url | undefined => state[NameSpace.User].avatarUrl;
