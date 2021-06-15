export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/activityList',
              },
              {
                path: '/activityList',
                name: 'activityList',
                icon: 'profile',
                component: './ActivityList',
              },
              {
                path: '/addActivity',
                name: 'addActivity',
                component: './AddActivity',
                icon: 'plusCircle',
                hideInMenu: true // 在menu中隐藏
              },
              {
                path: '/storeList',
                name: 'storeList',
                component: './StoreList',
                icon: 'plusCircle',
                hideInMenu: true // 在menu中隐藏
              },
              {
                path: '/assistantList',
                name: 'assistantList',
                icon: 'user',
                component: './AssistantList',
                hideInMenu: true // 在menu中隐藏
              },
              {
                path: '/usersList',
                name: 'usersList',
                component: './UsersList',
                icon: 'team',
                // hideInMenu: true // 在menu中隐藏
              },
              // {
              //   path: '/welcome',
              //   name: 'welcome',
              //   icon: 'smile',
              //   component: './Welcome',
              // },
              // {
              //   path: '/admin',
              //   name: 'admin',
              //   icon: 'crown',
              //   component: './Admin',
              //   authority: ['admin'],
              //   routes: [
              //     {
              //       path: '/admin/sub-page',
              //       name: 'sub-page',
              //       icon: 'smile',
              //       component: './Welcome',
              //       authority: ['admin'],
              //     },
              //   ],
              // },
              // {
              //   name: 'list.table-list',
              //   icon: 'table',
              //   path: '/list',
              //   component: './TableList',
              // },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
