import styles from "@/app/components/Article/ArticleItem/ArticleItem.module.css";

interface Article {
  title: string;
  author: string;
  publication: string;
  date: string;
  views: string;
  comments: string;
}

interface ArticleItemProps {
  article: Article;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  return (
    <div className={styles.articleItem}>
      <h2>{article.title}</h2>
      <p>{article.author} in {article.publication}</p>
      <p>{article.date} · {article.views} views · {article.comments} comments</p>
    </div>
  );
};

export default ArticleItem;
