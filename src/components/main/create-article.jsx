import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArticlesService } from "../../service/articles";
import {
  postArticleFailed,
  postArticleStart,
  postArticleSuccess,
} from "../../slice/articles";
import { Form } from "../../ui/form";

export const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    const article = { title, description, body };
    dispatch(postArticleStart());
    try {
      await ArticlesService.postArticle(article);
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
      <h1 className="fs-2">Create Article</h1>
      <Form {...formProps} />
    </div>
  );
};
