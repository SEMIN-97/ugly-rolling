/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const UserIndexLazyImport = createFileRoute('/user/')()
const LoginIndexLazyImport = createFileRoute('/login/')()
const SweatersIdLazyImport = createFileRoute('/sweaters/$id')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const UserIndexLazyRoute = UserIndexLazyImport.update({
  id: '/user/',
  path: '/user/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/user/index.lazy').then((d) => d.Route))

const LoginIndexLazyRoute = LoginIndexLazyImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login/index.lazy').then((d) => d.Route))

const SweatersIdLazyRoute = SweatersIdLazyImport.update({
  id: '/sweaters/$id',
  path: '/sweaters/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/sweaters/$id.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/sweaters/$id': {
      id: '/sweaters/$id'
      path: '/sweaters/$id'
      fullPath: '/sweaters/$id'
      preLoaderRoute: typeof SweatersIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/user/': {
      id: '/user/'
      path: '/user'
      fullPath: '/user'
      preLoaderRoute: typeof UserIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/sweaters/$id': typeof SweatersIdLazyRoute
  '/login': typeof LoginIndexLazyRoute
  '/user': typeof UserIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/sweaters/$id': typeof SweatersIdLazyRoute
  '/login': typeof LoginIndexLazyRoute
  '/user': typeof UserIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/sweaters/$id': typeof SweatersIdLazyRoute
  '/login/': typeof LoginIndexLazyRoute
  '/user/': typeof UserIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/sweaters/$id' | '/login' | '/user'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/sweaters/$id' | '/login' | '/user'
  id: '__root__' | '/' | '/sweaters/$id' | '/login/' | '/user/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  SweatersIdLazyRoute: typeof SweatersIdLazyRoute
  LoginIndexLazyRoute: typeof LoginIndexLazyRoute
  UserIndexLazyRoute: typeof UserIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  SweatersIdLazyRoute: SweatersIdLazyRoute,
  LoginIndexLazyRoute: LoginIndexLazyRoute,
  UserIndexLazyRoute: UserIndexLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/sweaters/$id",
        "/login/",
        "/user/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/sweaters/$id": {
      "filePath": "sweaters/$id.lazy.tsx"
    },
    "/login/": {
      "filePath": "login/index.lazy.tsx"
    },
    "/user/": {
      "filePath": "user/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
