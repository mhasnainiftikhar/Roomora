import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY || '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const { user } = useUser();
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const [rooms, setRooms] = useState([]);
    const [userData, setUserData] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);

    const getRoomsData = async () => {
        try {
            const { data } = await axios.get('/api/room/get-rooms');
            if (data.success) {
                setRooms(data.rooms);
            } else {
                toast.error(data.message || "Failed to fetch rooms");
            }
        } catch (error) {
            console.error("Error fetching rooms:", error);
            toast.error(error.response?.data?.message || "Failed to fetch rooms");
        }
    }

    const fetchUserData = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success || data.role) {
                setUserData(data);
                setIsOwner(data.role === 'hotelowner');
            } else {
                toast.error(data.message || "Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error(error.response?.data?.message || "Failed to fetch user data");
        }
    }

    const registerHotel = async (hotelData) => {
        try {
            const token = await getToken();
            const { data } = await axios.post('/api/hotel', hotelData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
                toast.success(data.message);
                await fetchUserData(); // Refresh user data to update role
                setShowHotelReg(false);
                navigate('/owner');
                return true;
            } else {
                toast.error(data.message || "Registration failed");
                return false;
            }
        } catch (error) {
            console.error("Error registering hotel:", error);
            toast.error(error.response?.data?.message || "Registration failed");
            return false;
        }
    }

    useEffect(() => {
        getRoomsData();
    }, []);

    useEffect(() => {
        if (user) {
            fetchUserData();
        } else {
            setUserData(false);
            setIsOwner(false);
        }
    }, [user]);

    const value = {
        currency,
        backendUrl,
        rooms,
        setRooms,
        userData,
        setUserData,
        getRoomsData,
        fetchUserData,
        registerHotel,
        isOwner,
        setIsOwner,
        showHotelReg,
        setShowHotelReg,
        navigate,
        toast,
        getToken
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};