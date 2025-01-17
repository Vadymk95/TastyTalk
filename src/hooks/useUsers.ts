import { useEffect, useMemo, useRef } from 'react';

import { useUsersStore } from '@root/store/usersStore';

export const useUsers = () => {
    const {
        users,
        searchQuery,
        setSearchQuery,
        loading,
        fetchUsers,
        fetchMoreUsers,
        error
    } = useUsersStore();

    const observerRef = useRef<HTMLDivElement>(null);

    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            user.usernameLower.toLowerCase().includes(searchQuery.toLowerCase())
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users]);

    useEffect(() => {
        if (users.length === 0) {
            fetchUsers(true);
        }
    }, [fetchUsers, users.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loading) {
                    fetchMoreUsers();
                }
            },
            { threshold: 1.0 }
        );

        const currentRef = observerRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [fetchMoreUsers, loading]);

    useEffect(() => {
        return () => setSearchQuery('');
    }, [setSearchQuery]);

    return {
        filteredUsers,
        searchQuery,
        setSearchQuery,
        loading,
        error,
        observerRef
    };
};
