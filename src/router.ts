// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/auth/beforeLoginList`
  | `/auth/googleCallback`
  | `/auth/login`
  | `/auth/user/profile`
  | `/clip`
  | `/clip/item`
  | `/clip/list`
  | `/clip/list/:id`

export type Params = {
  '/clip/list/:id': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
