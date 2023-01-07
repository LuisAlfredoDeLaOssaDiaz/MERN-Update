const express = require("express");
const PostController = require("../controllers/post");
const asureAuth = require("../middlewares/autenticated");
const multiparty = require("connect-multiparty");

const md_upload = multiparty({uploadDir: "./uploads/blog"});
const api = express.Router();

api.post("/post", [md_upload, asureAuth], PostController.createPost);
api.get("/post", PostController.getPosts);
api.patch("/post/:id", [md_upload, asureAuth], PostController.updatePost);
api.delete("/post/:id", [asureAuth], PostController.deletePost);
api.get("/post/:path", PostController.getPost);

module.exports = api;
 