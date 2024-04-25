import { Route, Routes } from 'react-router-dom';
import { AuthTabs } from '@components/auth-tabs';
import { RecoveryPassForm } from '@components/recovery-pass-form';
import {
    ChangePassError,
    ConfirmEmail,
    EmailError,
    EmailNoExist,
    LoginError,
    RegistrationError,
    RegistrationSaveError,
    SuccessResult,
} from '@components/results';
import { RouteSwitcher } from '@components/route-switcher';
import { AuthTabsKey, Paths } from '@constants/index.ts';
import { AchievementsPage } from '@pages/achievements-page';
import { AuthPage } from '@pages/auth-page';
import { CalendarPage } from '@pages/calendar-page';
import { ErrorPage } from '@pages/error-page';
import { FeedbackPage } from '@pages/feedback-page';
import { MainPage } from '@pages/main-page';
import { ProfilePage } from '@pages/profile-page';
import { ResultPage } from '@pages/result-page';
import { SettingsPage } from '@pages/settings-page';
import { WorkoutsPage } from '@pages/workouts-page';

export const routes = (
    <Routes>
        <Route path={Paths.R_SWITCHER} element={<RouteSwitcher />}>
            <Route index={true} path={Paths.MAIN} element={<MainPage />} />
            <Route path={Paths.FEEDBACK} element={<FeedbackPage />} />
            <Route path={Paths.WORKOUTS} element={<WorkoutsPage />} />
            <Route path={Paths.CALENDAR} element={<CalendarPage />} />
            <Route path={Paths.PROFILE} element={<ProfilePage />} />
            <Route path={Paths.SETTINGS} element={<SettingsPage />} />
            <Route path={Paths.ACHIEVEMENTS} element={<AchievementsPage />} />
            <Route path={Paths.NOT_FOUND} element={<ErrorPage />} />
        </Route>
        <Route path={Paths.AUTH} element={<AuthPage />}>
            <Route
                index={true}
                path={Paths.AUTH}
                element={<AuthTabs activeTab={AuthTabsKey.AUTH} />}
            />
            <Route
                path={Paths.REGISTRATION}
                element={<AuthTabs activeTab={AuthTabsKey.REGISTRATION} />}
            />
            <Route path={Paths.CONFIRM_EMAIL} element={<ConfirmEmail />} />
            <Route path={Paths.CHANGE_PASS} element={<RecoveryPassForm />} />
        </Route>
        <Route path={Paths.RESULT} element={<ResultPage />}>
            <Route path={Paths.SUCCESS} element={<SuccessResult />} />
            <Route path={Paths.SUCCESS_PASS_RECOVERY} element={<SuccessResult />} />
            <Route path={Paths.USER_EXIST_E} element={<RegistrationError />} />
            <Route path={Paths.ERROR} element={<RegistrationSaveError />} />
            <Route path={Paths.LOGIN_E} element={<LoginError />} />
            <Route path={Paths.CHECK_EMAIL_E} element={<EmailError />} />
            <Route path={Paths.EMAIL_EXIST_E} element={<EmailNoExist />} />
            <Route path={Paths.CHANGE_PASS_E} element={<ChangePassError />} />
        </Route>
    </Routes>
);
