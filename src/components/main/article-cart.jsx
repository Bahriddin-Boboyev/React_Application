import { useSelector } from "react-redux";
import copyright from "../../img/copyright.svg";
import { useNavigate } from "react-router-dom";
import { ArticlesService } from "../../service/articles";

export const ArticleCart = ({ item }) => {
  let { loggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const deleteArticle = async (slug) => {
    try {
      await ArticlesService.deleteArticle(slug);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col">
      <div className="h-100 card shadow-sm">
        <svg
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="225"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: Thumbnail"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#55595c"></rect>
        </svg>
        <div className="card-body">
          <p className="card-text fw-bold">
            {item.title.length > 72
              ? item.title.slice(0, 72) + "..."
              : item.title}
          </p>
          <p className="card-text m-0">
            {item.description.length > 181
              ? item.description.slice(0, 181) + "..."
              : item.description}
          </p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <button
              onClick={() => navigate(`/article/${item.slug}`)}
              type="button"
              className="btn btn-sm btn-outline-success"
            >
              View
            </button>
            {loggedIn && user.username === item.author.username && (
              <>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => navigate(`/edit-article/${item.slug}`)}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteArticle(item.slug)}
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                >
                  Delete
                </button>
              </>
            )}
          </div>
          <div>
            <img className="copyright" src={copyright} alt="img" />
            <small className="text-muted fw-bold">
              {item.author?.username}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
