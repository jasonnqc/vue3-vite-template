# How to Make API Requests

Hint: Use Composition API style.

## I. Make GET requests

### I1. Define query composable

1. Register new endpoint in `src/apis/endpoints.ts`
1. Define new composable with name `use[ModelName]Query` inside `/src/apis`
1. Call `useQuery` composable, pass in endpoint and desired options
1. Thanks to [Auto Import](./feat-auto-import-modules.md) feature, you don't have to import your newly defined composable in your Vue template or another composable, just use it right away.

Query with URL params, e.g. `/user` or `/user?page=2`:

```ts
import type { UseQueryOptions } from './helpers/useQuery';
import { useQuery } from './helpers/useQuery';
import type { UserList } from './models/User';
import { API_USERS } from './endpoints';

export function useUserListQuery(page?: number, options?: UseQueryOptions) {
  const context = useQuery<UserList, number>({
    url: API_USERS,
    filter: {
      payload: page,
      default: { page: 1 },
      resolve: (page: number) => ({ query: { page } }),
    },
    options,
  });

  context.onResult(() => {
    console.log('useUserListQuery: Add store dispatch here!');
  });

  return context;
}
```

Query with route params, e.g. `/user/1` or `/user/2`:

```ts
export function useUserQuery(id?: number, options?: UseQueryOptions) {
  const context = useQuery<User, number>({
    url: API_USERS + '/[id]',
    filter: {
      payload: id,
      resolve: (id: number) => ({ route: { id } }),
    },
    options,
  });

  context.onResult(() => {
    console.log('useUserQuery: Add store dispatch here!');
  });

  return context;
}
```

Query with multiple params, e.g. `/user/1/2/job?page=2`:

```ts
export interface UseUserJobListQueryPayload {
  userId: number;
  titleId: number;
  page: number;
}

export function useUserJobListQuery(
  payload?: UseUserJobListQueryPayload,
  options?: UseQueryOptions,
) {
  const context = useQuery<UserList, UseUserJobListQueryPayload>({
    url: API_USERS + '/[userId]/[titleId]/job',
    filter: {
      payload,
      default: { page: 1 },
      resolve: ({ userId, titleId, page }: UseUserJobListQueryPayload) => ({
        query: { page },
        route: { userId, titleId },
      }),
    },
    options,
  });

  context.onResult(() => {
    console.log('useUserJobListQuery: Add store dispatch here!');
  });

  return context;
}
```

Read [this](../src/apis/helpers/useQuery.ts) to learn more about `useQuery`'s inputs and outputs.

### I2. Consume query composable

Normal usage:

```ts
const { data, refetch, isLoading, isError } = useUserQuery(1);
```

Make lazy fetch:

```ts
const { data, fetch, isLoading, isError } = useUserQuery(undefined, { lazy: true });

function handleSomeButtonClick() {
  fetch(1);
}
```

In case having multiple API calls, recommend to declare context variables with `reactive` method to make the code cleaner:

```ts
const ctxUserQuery1 = reactive(useUserQuery(1));
const ctxUserQuery2 = reactive(useUserQuery(undefined, { lazy: true }));

function handleSomeButtonClick() {
  isButtonDisabled.value = ctxUserQuery1.isLoading;
  ctxUserQuery2.fetch(2);
}
```

## II. Make POST/PUT/DELETE requests

### II1. Define mutation composable

1. Register new endpoint in `src/apis/endpoints.ts`
1. Define new composable inside `/src/apis` with name `use[ModelName]Create`, `use[ModelName]Update` or `use[ModelName]Remove`, depends on the type of mutation you need.
1. Call `useMutation` composable, pass in endpoint and desired options
1. Use it in your Vue template or another composable

Example code:

```ts
import { API_USERS } from './endpoints';
import type { UseMutationOptions } from './helpers/useMutation';
import { useMutation } from './helpers/useMutation';
import type { User } from './models/User';

export function useUserCreate(options?: UseMutationOptions) {
  const context = useMutation<User>({ url: API_USERS, options });

  context.onDone(() => {
    console.log('Add store dispatch here!');
  });

  return context;
}
```

Read [this](../src/apis/helpers/useMutation.ts) to learn more about `useMutation`'s inputs and outputs.

### II2. Consume mutation composable

Normal usage:

```ts
const { mutate, isLoading, isError } = useUserCreate();

function handleSomeButtonClick() {
  mutate({
    name: 'Jason Nguyen',
    email: 'cuong.nguyen@nfq.asia',
  });
}
```

Multiple mutations:

```ts
const ctxUserCreate = reactive(useUserCreate());
const ctxUserRemove = reactive(useUserRemove({ useAppLoading: true }));

function handleSomeButtonClick() {
  ctxUserCreate.mutate({
    name: 'Jason Nguyen',
    email: 'cuong.nguyen@nfq.asia',
  });
}

function handleAnotherButtonClick() {
  ctxUserRemove.mutate(1);
}
```
