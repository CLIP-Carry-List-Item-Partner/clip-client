// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/auth/beforeLoginList`
  | `/auth/googleCallback`
  | `/auth/login`
  | `/clip`
  | `/clip/currentList`
  | `/clip/item`
  | `/clip/item/:id`
  | `/clip/item/backupIndex`
  | `/clip/list`
  | `/clip/list/:id`
  | `/clip/list/idbackup`

export type Params = {
  '/clip/item/:id': { id: string }
  '/clip/list/:id': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
