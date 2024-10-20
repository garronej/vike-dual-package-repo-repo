export { Page };

import { css as css_ } from "a-module-that-uses-emotion/i-export-css-from-emotion-react";
import { css } from "@emotion/react";

const message = `@emotion/react dual package situation: ${css_ === css ? "false" : "true"}`

console.log("=======================>", message);

function Page() {
  return (
    <h2>
      {message}
    </h2>
  );
}
