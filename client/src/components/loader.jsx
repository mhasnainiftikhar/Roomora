import React, { useEffect } from 'react';
import { useAppContext } from '../context/appContext.jsx';
import { useParams } from 'react-router-dom';

const Loader = () => { // Changed to uppercase
    const { navigate } = useAppContext();
    const { nextUrl } = useParams();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(`/${nextUrl}`);
        }, 3000);
        return () => clearTimeout(timer);
    }, [nextUrl, navigate]); 

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-white'>
            <div className="animate-spin rounded-full border-8 border-t-8 border-gray-200 border-t-blue-500 h-32 w-32 mb-4"></div>
            <h2 className="text-center text-2xl font-semibold text-gray-700">Processing your payment...</h2>
            <p className="text-center text-gray-500 mt-2">Please wait while we redirect you.</p>   
        </div>
    );
}

export default Loader; 