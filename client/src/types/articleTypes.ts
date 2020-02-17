export interface Article {
  id: Number;
  title: string;
  body: { content: string };
}

export interface NewArticle {
  title: string;
  body: { content: string };
}
