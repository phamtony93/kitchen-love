import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { checkUserAccessableRoutes } from '../firebase'

const ProtectedRoute = ({ component: Component, ...rest}) => {
    return (
        <Route {...rest} render={(props) => {
            const isAuthenticated = (localStorage.getItem("authenticated") === "true" || localStorage.getItem("authenticated") === true)
                ? true
                : false
            const { path } = {...rest}
            const route = path.slice(1,)  
            const isAuthorized = checkUserAccessableRoutes(route)
            if (isAuthenticated && isAuthorized) {
                return <Component {...props}/>
            } else if (isAuthenticated && !isAuthorized) {
                return <Redirect to='/403'/>
            } else {
                return <Redirect to='/login'/>
            }
        }}

        />
    )
}

export default ProtectedRoute