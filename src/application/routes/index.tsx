/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:enable:no-unused-variable */
import {IndexRoute, Route} from 'lib/router'

import {IAppState} from 'application/AppAL/IAppState'
import {IUserActions} from 'application/AppAL/User/IUserActions'
import {ISystemActions} from 'application/AppAL/System/ISystemActions'

import {IHomeModule} from 'application/modules/Home/IHomeModule'
import {Layout, loadPage} from 'application/сomponents'

import NotFoundPage from 'application/pages/NotFound'

const routes = (args: {
  appState: IAppState,
  userActions: IUserActions,
  systemActions: ISystemActions
}) => {
  let permissions = args.appState.user.permissions
  return (
    <Route>
      <Route path="/" component={Layout}>
        <IndexRoute
          getComponent={loadPage(require('bundle?lazy&name=home!../modules/Home/index.ts'), args, (module: IHomeModule) => module.HomePage)}/>
        {permissions.v === 1 && (
          <Route path="/restricted"
                getComponent={loadPage(require('bundle?lazy&name=home!../modules/Home/index.ts'), args, (module: IHomeModule) => module.RestrictedPage)}/>
        )}
      </Route>
      <Route path="*" component={NotFoundPage} onEnter={() => {args.systemActions.goto('/')}}/>
    </Route>
  )
}

export default routes
