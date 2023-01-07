const course = require("../models/course");
const Course = require("../models/course");
const { msg } = require("../msg/msg");
const image = require("../utils/image")

async function createCourse(req, res) {
    const course = new Course(req.body);

    const imagePath = image.getFilePath(req.files.miniature);
    course.miniature = imagePath;

    course.save((error, courseStored) => {
        if (error) {
            msg(res,400,"Error al crear curso.")
        } else {
            msg(res,200, courseStored)
        }
    })
}

async function updateCourse(req, res) {
    const {id} = req.params;
    const courseData = req.body;
    
    if(req.files.miniature) {
        const imagePath = image.getFilePath(req.files.miniature);
        courseData.miniature = imagePath;
    }

    Course.findByIdAndUpdate({_id : id}, courseData, (err) => {
        if (err) {
            return msg(res, 400, "Error al actualizar.")
        } else {
            return msg(res, 200, "Usuario Actualizado")
        }
    })
}

async function deleteCourse(req, res) {
    const {id} = req.params;

    Course.findByIdAndDelete(id, (err) => {
        if (err) {
            return msg(res, 400, "Error al eliminar.")
        } else {
            return msg(res, 200, "Usuario eliminado.")
        }
    })
}

async function getCourse(req, res) {
    const {page = 1, limit = 1} = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    };

    Course.paginate({}, options, (error, courses) => {
        if (error) {
            msg(res,400,"Error al obtener cursos.")
        } else {
            msg(res,200,courses)
        }
    })
}

module.exports = {
    createCourse,
    updateCourse,
    deleteCourse,
    getCourse,
} 
