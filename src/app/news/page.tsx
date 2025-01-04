import React from 'react';
import { NewsSearch } from '@/components/news/news-search';

const NewsPage: React.FC = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div className='dark:text-white text-gray-600' style={{ textAlign: 'center', fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>News Page</div>
            <div style={{ marginBottom: '20px' }}>
            <NewsSearch />
            </div>
            
        </div>
    );
};

export default NewsPage;