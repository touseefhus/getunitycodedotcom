"use client";
import React, { useEffect, useState } from "react";
import { fetchArticles } from "@/helpers/apiFetcher";
const Page = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  const getArticles = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchArticles(page, articlesPerPage);
      setArticles(data.articles);
    } catch (error) {
      setError("Error fetching articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticles(currentPage);
  }, [currentPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-500">
        Loading articles...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Latest Articles
      </h1>
      <ul className="space-y-6">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <li
              key={index}
              className="p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-800">
                {article.title}
              </h2>
              <p className="text-gray-600 mt-2">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Read more
              </a>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No articles found.</li>
        )}
      </ul>

      {/* Pagination controls */}
      <div className="mt-8 flex justify-center items-center">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-opacity"
        >
          Previous
        </button>
        <span className="mx-4 text-gray-800">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-opacity"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
