export function joinURL(...paths: string[]) {
  return paths.join('/').replace(/(\/)\1{1,}/g, '$1');
}
