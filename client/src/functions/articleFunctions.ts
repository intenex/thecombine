import { Article, NewArticle } from "../types/articleTypes";

export const getArticles = async () => {
  const response = await fetch("/api/articles");
  const articles: Article[] = await response.json();
  return articles;
};

export const postArticle = async (postBody: NewArticle) => {
  const response = await fetch("/api/articles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postBody)
  });
  const newArticle: Article = await response.json();
  console.log(newArticle);
  return newArticle;
};

export const updateArticle = async (postBody: Article) => {
  const { id } = postBody;
  const response = await fetch(`/api/articles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postBody)
  });
};
