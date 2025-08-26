'use client';

import { useEffect, useState } from "react";

export default function useUser() {

    const [username, setUsername] = useState('');
    const [loginID, setLoginID] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        setRole(localStorage.getItem('role'));
        setUsername(localStorage.getItem('UserName'));
        setLoginID(localStorage.getItem('LoginID'));
    }, []);

    return {
        username,
        role,
        loginID
    }
}