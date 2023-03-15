import moment from "moment/moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ArticlesService } from "../service/articles";
import {
  getArticlesDetailFailed,
  getArticlesDetailStart,
  getArticlesDetailSuccess,
} from "../slice/articles";
import copyright from "../img/copyright.svg";
import { Loader } from "../ui/loader";

export const ArticleDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { articleDetail, isLoading } = useSelector((state) => state.article);

  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticlesDetailStart());
      const response = await ArticlesService.getArticleDetail(slug);
      try {
        dispatch(getArticlesDetailSuccess(response.article));
      } catch (error) {
        dispatch(getArticlesDetailFailed());
      }
    };

    getArticleDetail();
  }, [slug]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        articleDetail !== null && (
          <div className="p-5 mb-4 rounded-3 bg-light">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">{articleDetail.title}</h1>
              <p className="col-md-8 fs-4">{articleDetail.description}</p>
              <div className="d-flex gap-3">
                <small className="fw-medium text-muted">
                  Created at:{" "}
                  <span className="opacity-75">
                    {moment(articleDetail.createdAt).format("MM DD MMM YYYY")}
                  </span>
                </small>
                <small className="fw-medium text-muted">
                  Updated at:{" "}
                  <span className="opacity-75">
                    {" "}
                    {moment(articleDetail.updatedAt).format("MM DD MMM YYYY")}
                  </span>
                </small>
                <div className="fw-medium mx-5 minus">
                  <img className="copyright" src={copyright} alt="img" />
                  <small>{articleDetail.author.username}</small>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};
