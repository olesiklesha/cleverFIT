import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { RouterState } from 'redux-first-history';
import { PrivateOutlet } from '@components/private-outlet';
import { Paths } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { setAuthToken } from '@redux/auth-slice/auth-slice.ts';
import { getUserInfo } from '@redux/profile-slice/profile-slice-thunk.ts';
import { authSelector, routerSelector } from '@redux/selectors.ts';
import { getInvites } from '@redux/workouts-slice/workouts-slice-thunk.ts';

export const RouteSwitcher = () => {
    const { location } = useAppSelector<RouterState>(routerSelector);
    const { token } = useAppSelector(authSelector);
    const dispatch = useAppDispatch();

    if (location && location.search) {
        dispatch(setAuthToken(location.search.split('=')[1]));
    }

    useEffect(() => {
        if (!token) return;
        dispatch(getUserInfo());
        dispatch(getInvites());
    }, [dispatch, token]);

    if (!token) return <Navigate to={Paths.AUTH} />;

    return <PrivateOutlet />;
};
