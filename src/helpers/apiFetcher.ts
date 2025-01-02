// src/app/api/serverApi/articleApi.ts
export const fetchArticles = async (page: number, pageSize: number) => {
    const apiKey = "def3233ef8d54840b6816f0c6dde1f81";
    const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2024-11-16&sortBy=publishedAt&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorDetails = await response.json().catch(() => null);
            console.error("Server Error Details:", errorDetails);
            throw new Error(`Server Error: ${response.status}`);
        }

        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching articles:", error.message);
        } else {
            console.error("Unexpected error:", error);
        }
        throw error;
    }
};
