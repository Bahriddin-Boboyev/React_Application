import { Loader } from "../../ui/loader";
import uniqueId from "../../helpers/uniqueid";
import { ArticleCart } from "./article-cart";
import { useSelector } from "react-redux";

export const Main = () => {
  let { isLoading, articles } = useSelector((state) => state.article);

  articles = articles.map((article) => {
    return Object.assign({}, article, { id: uniqueId() });
  });

  return (
    <div>
      <div className="album py-5 ">
        <div className="container">
          {isLoading && <Loader />}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {articles.map((item) => (
              <ArticleCart key={item.id} item={item}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
