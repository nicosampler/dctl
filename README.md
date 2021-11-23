### How to run the app

```sh
$ mv .env.example .env.local
# Add Infura token to .env.local

$ yarn install
$ yarn start
```

### Token contract

I've deployed the contract and validated the code on [Etherscan](https://kovan.etherscan.io/address/0x3012A51A827e9C8CcB61b9898aAF7A80BF3B3f19#readContract).

### Tech stack

- Boilerplate: I've used `npx create-react-app my-app --template redux-typescript` as a starting point.
- web3 connection: `@usedapp/core`.
- Typechain: I've used typechain to generate the types for the contract (Token).
- Redux tool: @reduxjs/toolkit
- Redux middleware: Sagas.

### Extra features

- WrongNetwork component.
- Modal-From validator
- Network configurable by env vars. For simplicity I thought it was enough to only configure one network (kovan).

### hacks

- Using redux/middleware has a strong limitation because it does not allow to use React Hooks. For example when I call `balanceOf` I can't consume `useEthers` from `@usedapp/core`. That's why I've created `<SetProvider />` component, it sets the library (web3provider) in `src/utils/provider.ts`. This hack allows me to use the connected provider to interact with the Token contract.

- I've used [createEntityAdapter](https://redux-toolkit.js.org/api/createEntityAdapter) from `@reduxjs/toolkit`, note that `walletsAdapter.getSelectors` already implements `reselect`

```
Each selector function will be created using the createSelector function from Reselect, to enable memoizing calculation of the results.
```

### Links & docs I've used

- https://redux-saga.js.org/docs/api
- https://redux-toolkit.js.org/api/configureStore
- https://redux.js.org/tutorials/essentials/part-1-overview-concepts
