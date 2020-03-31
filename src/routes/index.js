import Vue from "vue";
import Router from "vue-router";
import paths from "./paths";

function route(path, view, name, props = false) {
  return {
    name: name || view,
    path,
    props,
    component: resovle => import(`@/views/${view}.vue`).then(resovle)
  };
}

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: paths
    .map(path => route(path.path, path.view, path.name, path.props))
    .concat([{
      path: "*",
      redirect: "/"
    }])
});

export default router;