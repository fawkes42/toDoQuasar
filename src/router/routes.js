
const routes = [
  {
    path: '/',
    component: () => import('layouts/MenuDefault.vue'),
    children: [
      { path: 'todo', component: () => import('pages/ToDo.vue') },
      { path: 'chat', component: () => import('pages/Chat.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
