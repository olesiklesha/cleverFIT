import { useEffect, useRef } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { authSelector } from '@redux/selectors.ts';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import animation from '../../assets/animation.json';

import './loader.css';

export const Loader = () => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const { loading } = useAppSelector(authSelector);

    useEffect(() => {
        if (loading) {
            lottieRef.current?.play();
        } else {
            lottieRef.current?.stop();
        }
    }, [loading]);

    return (
        loading && (
            <div className='loader-container' data-test-id='loader'>
                <Lottie animationData={animation} lottieRef={lottieRef} />
            </div>
        )
    );
};
