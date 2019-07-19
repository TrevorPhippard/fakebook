import React from "react";

import { AuthUserContext } from "../../containers/Sessions";

const Acct = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Hello: {authUser.email}</h1>
      </div>
    )}
  </AuthUserContext.Consumer>
);

export default Acct;
