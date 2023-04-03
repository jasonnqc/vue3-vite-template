import qs from 'query-string';

import type { KeyValue } from '@/types/shared';

export function applyRouteData(route: string, routeData: KeyValue<string | number | undefined>) {
  let result = route;
  Object.keys(routeData).forEach((key) => {
    if (routeData[key]) {
      result = result.replace(new RegExp(`\\[(${key})\\]`, 'g'), routeData[key] + '');
    }
  });
  return result;
}

export function getCacheId(url: string, query: any = {}, defaultQuery: any = {}) {
  Object.keys(defaultQuery).forEach((key) => {
    if (!query[key]) {
      query[key] = defaultQuery[key];
    }
  });
  return `api:${url}${
    query && Object.keys(query).length > 0
      ? '?' + qs.stringify(query, { skipNull: true, skipEmptyString: true })
      : ''
  }`;
}
