const Post = require("../models/post");
const image = require("../utils/image");
const {msg} = require("../msg/msg");

function createPost(req, res) {
    const post = new Post(req.body);
    post.created_at = new Date();

    if (req.files.miniature) {
        const imagePath = image.getFilePath(req.files.miniature);
        post.miniature = imagePath;
    }

    post.save((error, postStored) => {
        if (error) {
            msg(res,400,"Error al crear post.")
        } else {
            msg(res,200, postStored);
        }
    })

}

function getPosts(req, res) {
    const {page = 1 , limit = 10} = req.query;
    
    const options= {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: {created_at: "desc"}
    }
    
    Post.paginate({}, options, (error, postStored) => {
        if (error) {
            msg(res, 400, "Error al obtener los post.");
        } else {
            msg(res, 200, postStored);
        }
    })
}

async function updatePost(req, res) {
    const { id } = req.params;
    const postData = req.body;

    //Miniatire
    if (req.files.miniature) {
        const imagePath = image.getFilePath(req.files.miniature)
        postData.miniature = imagePath;
    }

    Post.findByIdAndUpdate({_id: id}, postData, (err) => {
        if (err) {
            return msg(res, 400, "Error al actualizar.")
        } else {
            return msg(res, 200, "Post actualizado.")
        } 
    })
}

async function deletePost(req, res) {
    const {id} = req.params;
    Post.findByIdAndDelete({_id : id}, (error) => {
        if (error) {
            msg(res, 400, "Error al eliminar usuario.")
        } else {
            msg(res, 200, "Usuario eliminado.");
        }
    })
}

function getPost(req, res) {
    const {path} = req.params;

    Post.findOne({path}, (error, postStored) => {
        if (error) {
            msg(res,500, "Error del server.")
        } else if(!postStored){
            msg(res,400, "No se encontró post");
        } else {
            msg(res,200, postStored);
        }
    })
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPost,
}