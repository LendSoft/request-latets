import { useMemo } from 'react';
import useSortedPosts from '../hooks/useSortedPosts';

export const usePosts = (posts, query, type, prioritySort) => {
    const sortedPosts = useSortedPosts(posts, type, prioritySort);

    const sortedAndSearchedPosts = useMemo(() => {
        if (!sortedPosts) return [];

        return sortedPosts.filter(post =>
            Object.values(post).some(value =>
                value.toString().toLowerCase().includes(query.toLowerCase())
            )
        );
    }, [query, sortedPosts]);

    return sortedAndSearchedPosts;
};
