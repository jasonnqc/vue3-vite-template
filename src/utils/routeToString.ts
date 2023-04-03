import type { RouteLocationRaw } from 'vue-router/auto';

export function routeToString(typedRoute: RouteLocationRaw) {
  return typedRoute as string;
}
