import React, { useEffect, useContext, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const VerifyPayment = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const navigate = useNavigate();
    const { getToken } = useContext(AppContext);
    const processed = useRef(false);

    useEffect(() => {
        const verify = async () => {
            if (!sessionId) {
                navigate('/my-bookings');
                return;
            }

            // Prevent double calling in React Strict Mode which might cause race conditions
            if (processed.current) return;
            processed.current = true;

            try {
                const token = await getToken();
                const { data } = await axios.post('/api/booking/verify',
                    { sessionId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (data.success) {
                    toast.success("Payment successful!");
                    navigate('/my-bookings');
                } else {
                    toast.error(data.message || "Payment verification failed");
                    navigate('/my-bookings');
                }
            } catch (error) {
                console.error("Verification error:", error);
                toast.error(error.response?.data?.message || "Error verifying payment");
                navigate('/my-bookings');
            }
        };

        verify();
    }, [sessionId, getToken, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl font-bold text-gray-900">Verifying Payment...</h2>
                <p className="text-gray-500 text-sm mt-2">Please do not close this window.</p>
            </div>
        </div>
    );
};

export default VerifyPayment;
