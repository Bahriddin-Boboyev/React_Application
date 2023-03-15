import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ArticlesService } from "../../service/articles";
import {
  getArticlesDetailFailed,
  getArticlesDetailStart,
  getArticlesDetailSuccess,
  postArticleFailed,
  postArticleStart,
  postArticleSuccess,
} from "../../slice/articles";
import { Form } from "../../ui/form";

export const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticlesDetailStart());
      try {
        const response = await ArticlesService.getArticleDetail(slug);
        setTitle(response.article.title);
        setDescription(response.article.description);
        setBody(response.article.body);
        dispatch(getArticlesDetailSuccess(response.article));
      } catch (error) {
        dispatch(getArticlesDetailFailed());
      }
    };

    getArticleDetail();
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();
    const article = { title, description, body };
    dispatch(postArticleStart());
    try {
      await ArticlesService.editArticle(slug, article);
      dispatch(postArticleSuccess());
      navigate("/");
      window.location.reload();
    } catch (error) {
      dispatch(postArticleFailed());
      console.log(error);
    }
  };

  const formProps = {
    title,
    setTitle,
    description,
    setDescription,
    body,
    setBody,
    formSubmit,
  };

  return (
    <div className="text-center ">
      <h1 className="fs-2">Edit Article</h1>
      <Form {...formProps} />
    </div>
  );
};
