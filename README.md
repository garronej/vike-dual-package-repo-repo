
## Context

This is a follow up to [this issue](https://github.com/garronej/vite-dual-package-repro-repo) that has been resolved by @Andarist in [this PR to Vite](https://github.com/vitejs/vite/pull/13370). 

## Description of the issue

Dual package situation with `emotion` 11.13 and up with [Vike](https://vike.dev/) in development.  
Note that the problem is only present on the server side.  

Concretely what is happening is that when a module imports `@emotion/react` and when `@emotion/react` is imported directly in the app, it
is not the same distribution of `@emotion/react` that is used.  

`import { css } from "@emotion/react";` condition used: `exports["."].development.default` (emotion-react.development.cjs.js)  
`import { css } from "a-module-that-uses-emotion/i-export-css-from-emotion-react"` condition used `exports["."].default` (emotion-react.cjs.js)  

The relevant code is in [`pages/index/+Page.tsx`](./pages/index/+Page.tsx).  

## Step to reproduce

```bash
git clone https://github.com/garronej/vike-dual-package-repo-repo
cd vike-dual-package-repo-repo
yarn install
yarn dev
```

Navigate to `http://localhost:3000/` and open the console.  

https://github.com/user-attachments/assets/344cf74a-ca6d-4c68-9e40-579dac66bd9b

## Expected behavior


Printed by node in the console:  
`=======================> @emotion/react dual package situation: false`

No hydration error in the browser console and it should read:  
`@emotion/react dual package situation: false`  

> NOTE: Downgrading to `@emotion/react@11.12.0` will yield this outcome.

## Actual behavior

Printed by node in the console:
`=======================> @emotion/react dual package situation: true`

In the browser: 
Upon loading the page we can see for a brief moment:  
`@emotion/react dual package situation: true`  
then it changes to:  
`@emotion/react dual package situation: false`

In the browser console we can read:  

```
chunk-SB5BK2J2.js?v=17a418c1:519 Warning: Text content did not match.  
    Server: "@emotion/react dual package situation: true"  
    Client: "@emotion/react dual package situation: false"

    at h2
    at Page
```

## Debug help

To track what condition are used to import `@emotion/react` you can run:  

```bash
npx patch-package
yarn dev
```



