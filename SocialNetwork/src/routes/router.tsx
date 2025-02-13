import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import HomeLayout from '../Layouts/HomeLayout';
import GroupLayout from '../Layouts/GroupLayout';
import WatchLayout from '../Layouts/WatchLayout';
import MaketPlaceLayout from '../Layouts/MarketPlaceLayout';
import GuestGuard from '../containers/auth/GuestGuard';
import { Signin, Signup } from '../pages/auth';
import AuthGuard from '../containers/auth/AuthGuard';
import ProfilePage from '../pages/section/ProfilePage';
import TopBar from '../Layouts/TopBar';
import HomePage from '../pages/section/HomePage';
import WatchPage from '../pages/section/WatchPage';
import ChatPopUp from '../Components/ChatPopUp/ChatPopUp';

// nqhwng@gmail.com

const Router: FC = () => {

  return useRoutes([
    {
      path:"auth",
      element:<GuestGuard></GuestGuard>,
      children: [
        {
          index: true,
          path: 'sign-in',
          element:<Signin />,
        },
        {
          path: 'sign-up',
          element:<Signup />,
        },
      ],
    },
    {
      element:<AuthGuard>
                <TopBar/>
                <ChatPopUp/>
              </AuthGuard>,
      children:[
        {
          element:<HomeLayout/>,
          children:[
            {
              index: true,
              path: '/',
              element:<HomePage />,
            },
          ]
          
        },
        {
          element:<GroupLayout />,
          path:'/group'
        },
        {
          element:<WatchLayout />,
          children:[
            {
              index: true,
              path: '/watch',
              element:<WatchPage />,
            },
          ]
        },
        {
          element:<MaketPlaceLayout />,
          path:'/marketplace'
        },
        {
          element:<ProfilePage />,
          path:'/profile/:id'
        },
        

      ]
    },
    
  ]);
};

export default Router;
