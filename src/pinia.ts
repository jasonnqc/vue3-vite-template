import { cloneDeep } from 'lodash';
import type { PiniaPluginContext } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

function resetStore({ store }: PiniaPluginContext) {
  const initialState = cloneDeep(store.$state);
  store.$reset = () => store.$patch(cloneDeep(initialState));
}

const pinia = createPinia();

pinia.use(resetStore);
pinia.use(piniaPluginPersistedState);

export default pinia;
