import { memo } from "react";

import { NewsArticle } from "@src/type/newsArticleTypes";

interface NewsItemsProps {
    newsItem: NewsArticle
}

const NewsItems: React.FC<NewsItemsProps> = memo(({ newsItem }) => {

    return (
        <>
        </>
    );
});

export default NewsItems;