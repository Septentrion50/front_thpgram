import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from 'components/Navigation';
import PrivateRoute from 'components/PrivateRoute';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Home from 'pages/Home'
import Profile from 'pages/Profile'
import Post from 'pages/Post'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from 'redux/actions/postActions';
import { useEffect } from 'react';
import { getUser } from 'redux/actions/authActions';
import Cookies from 'js-cookie';
function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts())
    dispatch(getUser(Number.parseInt(Cookies.get('id'))))
  }, [])

  const posts = useSelector(state => state.posts.posts);
  const user = useSelector(state => state.auth.user);

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path='/' exact>
            <Home posts={posts} />
          </Route>
          <PrivateRoute path='/post/:postId' exact component={Post}/>
          <PrivateRoute path='/profile' exact>
            <Profile user={user} />
          </PrivateRoute>
          <Route path='/login' exact component={Login}/>
          <Route path='/register' exact component={Register}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
