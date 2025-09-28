import React, { useState, useEffect } from 'react';

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  category: string;
}

export const dummyNews: NewsArticle[] = [
  {
    id: 1,
    title: "Karate World Championship Announced",
    content:
      "The World Karate Federation has officially announced the dates for the upcoming Karate World Championship. The event will bring together top athletes from around the globe to compete for glory and national pride.",
    author: "John Doe",
    publishedAt: "2025-09-15T10:30:00Z",
    imageUrl: "/images/news/world-championship.jpg",
    category: "Events",
  },
  {
    id: 2,
    title: "Tips to Improve Your Kata Performance",
    content:
      "Kata is an essential aspect of karate training. In this article, we share expert tips on how to improve your form, breathing techniques, and mental preparation for better performance in competitions.",
    author: "Jane Smith",
    publishedAt: "2025-09-10T08:00:00Z",
    imageUrl: "/images/news/kata-tips.jpg",
    category: "Training",
  },
  {
    id: 3,
    title: "Local Dojo Wins Regional Tournament",
    content:
      "A local dojo from Dhaka has won the regional karate tournament, beating several top teams in a thrilling final match. The dojo's head coach praised the athletes for their hard work and discipline.",
    author: "Mark Johnson",
    publishedAt: "2025-09-05T14:20:00Z",
    imageUrl: "/images/news/regional-tournament.jpg",
    category: "Achievements",
  },
  {
    id: 4,
    title: "New Safety Rules Introduced for Karate Competitions",
    content:
      "The Karate Federation has introduced new safety rules aimed at reducing injuries during tournaments. These changes include mandatory protective gear and revised scoring criteria.",
    author: "Sarah Lee",
    publishedAt: "2025-09-02T09:45:00Z",
    imageUrl: "/images/news/safety-rules.jpg",
    category: "Regulations",
  },
  {
    id: 5,
    title: "Karate Training Camps Scheduled for Winter",
    content:
      "Winter training camps are now open for registration. These camps are designed to help karate practitioners of all levels enhance their skills and prepare for upcoming tournaments.",
    author: "Emily Brown",
    publishedAt: "2025-08-28T11:15:00Z",
    imageUrl: "/images/news/training-camp.jpg",
    category: "Training",
  },
];


const NewsList: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      //const response = await fetch('/api/news');
      //const data = await response.json();
      setArticles(dummyNews);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading news...</div>;
  }

  return (
    <div className="news-list">
      <h2>Latest News</h2>
      <div className="articles-grid">
        {articles.map(article => (
          <article key={article.id} className="news-article">
            {article.imageUrl && (
              <img src={article.imageUrl} alt={article.title} className="article-image" />
            )}
            <div className="article-content">
              <span className="article-category">{article.category}</span>
              <h3>{article.title}</h3>
              <p>{article.content.substring(0, 150)}...</p>
              <div className="article-meta">
                <span>By {article.author}</span>
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NewsList;