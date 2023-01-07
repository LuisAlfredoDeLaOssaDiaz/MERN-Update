const express = require("express");
const CourseController = require("../controllers/course");
const multiparty = require("connect-multiparty");
const asureAuth = require("../middlewares/autenticated")

const md_upload = multiparty({uploadDir: "./uploads/course"})
const api = express.Router();

api.post("/course", [asureAuth, md_upload], CourseController.createCourse);
api.patch("/course/:id", [asureAuth, md_upload], CourseController.updateCourse);
api.delete("/course/:id", asureAuth, CourseController.deleteCourse);
api.get("/courses", md_upload, CourseController.getCourse);

module.exports = api;
  