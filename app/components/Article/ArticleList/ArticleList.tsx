import ArticleItem from "@/app/components/Article/ArticleItem/ArticleItem";
import styles from "@/app/components/Article/ArticleList/ArticleList.module.css";

interface Article {
  title: string;
  author: string;
  publication: string;
  date: string;
  views: string;
  comments: string;
}

const articles: Article[] = [
  {
    title: "What Happens When You Start Reading Every Day",
    author: "Sufyan Maan, M.Eng",
    publication: "ILLUMINATION",
    date: "Mar 12",
    views: "27K",
    comments: "621",
  },
  {
    title: "When the Money Is Real, but the Product Is Fake",
    author: "Linda Margaret",
    publication: "Brain Labs",
    date: "...",
    views: "...",
    comments: "...",
  },
  // Add more articles as needed
];

const ArticleList: React.FC = () => {
  return (
    <div className={styles.articleList}>
      {articles.map((article, index) => (
        <ArticleItem key={index} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
