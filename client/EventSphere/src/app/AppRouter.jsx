import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {privateRoutes, publicRoutes} from "../routes.js";
import {Navigate, Route, Router, Routes} from "react-router-dom";
import {Context} from "./context.js";
import {HOME_PAGE} from "../shared/constants/const.js";

const AppRouter = observer(() => {
    const {user} = useContext(Context);

    return (
        <Routes key={user.isAuth ? true : !user.isAuth}>
            {user.isAuth &&
                privateRoutes.map(({ path, Element, role }) =>
                    role.includes(user.role) ? (
                        <Route key={path} path={path} element={<Element />} />
                    ) : null
                )}
            {publicRoutes.map(({ path, Element }) => (
                <Route key={path} path={path} element={<Element />} />
            ))}
            <Route path="*" element={<Navigate to={HOME_PAGE} />} />
        </Routes>
    );
});

export default AppRouter;