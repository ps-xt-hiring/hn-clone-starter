import express from "express";

import serverRenderer from "../middleware/renderer";
import { configureStore } from "../../src/store/configureStore";
import { getNewsFeedAction } from "../../src/Actions/newsAction";

const router = express.Router();
const path = require("path");

const actionIndex = (req, res, next) => {
  let currentPage = 1;
  if (Object.keys(req.query).length && req.query.p) {
    currentPage = Number.isNaN(Number(req.query.p)) ? 1 : Number(req.query.p);
  }
  const store = configureStore();
  store.dispatch(getNewsFeedAction(currentPage)).then(() => {
    serverRenderer(store)(req, res, next);
  });
};

// root (/) should always serve our server rendered page
router.use("^/$", actionIndex);
// other static resources should just be served as they are
router.use(
  express.static(path.resolve(__dirname, "..", "..", "build"), {
    maxAge: "30d"
  })
);
// any other route should be handled by react-router, so serve the index page
router.use("*", actionIndex);

export default router;
