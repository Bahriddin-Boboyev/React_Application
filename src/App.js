import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar, Main, Footer, ArticleDetail } from "./components";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { AuthService } from "./service/auth";
import { useDispatch } from "react-redux";
import { signUserSuccess } from "./slice/auth";
import { getItem } from "./helpers/persistance-storage";
import { ArticlesService } from "./service/articles";
import { getArticlesStart, getArticlesSuccess } from "./slice/articles";
import { CreateArticle } from "./components/main/create-article";
import { EditArticle } from "./components/main/edit-article";
import { Profile } from "./components/main/profile";
import { EditProfile } from "./components/main/edit-profile";
function App() {
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const response = await AuthService.getUser();
      dispatch(signUserSuccess(response.user));
    } catch (error) {
      console.log(error);
    }
  };
  const getArticles = async () => {
    dispatch(getArticlesStart());
    try {
      const response = await ArticlesService.getArticles();
      dispatch(getArticlesSuccess(response.articles));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      getUser();
    }
    getArticles();
  }, []);

  return (
    <div className="container">
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/article/:slug" element={<ArticleDetail />} />
        <Route path="/create-article" element={<CreateArticle />} />
        <Route path="/edit-article/:slug" element={<EditArticle />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route
          path="*"
          element={
            <h2 className="text-center not-found">
              <a href="https://git.io/typing-svg">
                <img
                  src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=25&pause=1000&color=000000&width=435&lines=404%3A+Page+not+found."
                  alt="Typing SVG"
                />
              </a>
            </h2>
          }
        />
      </Routes>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
