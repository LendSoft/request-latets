import { useMemo } from 'react';

const useSortedPosts = (posts, type, prioritySort) => {
    const sortedPosts = useMemo(() => {
        if (!Array.isArray(posts)) return [];

        let sorted = [...posts];

        if (type) {
            sorted = sorted.filter(post => post.type === type);
        }

        if (prioritySort) {
            sorted = sorted.sort((a, b) => {
                if (prioritySort === 'asc') {
                    return a.priority - b.priority;
                } else if (prioritySort === 'desc') {
                    return b.priority - a.priority;
                }
                return 0;
            });
        }

        return sorted;
    }, [posts, type, prioritySort]);

    return sortedPosts;
};

export default useSortedPosts;
