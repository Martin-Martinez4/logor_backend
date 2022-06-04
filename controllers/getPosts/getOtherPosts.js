

 //  SELECT * FROM comments jOIN user_headers ON comments.user_id = user_headers.user_id WHERE tag_id = '849998ef-e4b6-48ce-aa0d-7bbef2ee1995' ORDER BY comments.created_at;

export const handleGetCommentsByUserID = (req, res, next, db) => {

    const {id } = req.params

    // console.log(id)

    db.distinct('*').from('users')
    .join('comments', 'comments.user_id', 'users.id')
        .where('comments.user_id', '=', `${id}`)
        .orderBy('created_at', 'DESC')
        .then((comments) => {

            // console.log(comments);
            res.status(200).json(comments);
        })
        .catch(err => {
            // console.log(err)
            if(!err.statusCode){

                err.statusCode = 500;
            }
    
            err.message = "Error getting user comments."
    
            next(err);
            res.json([])
        });


}

export const handleGetCommentsByUserNickname = (req, res, next, db) => {

    const { nickname } = req.params

    const tagNickname = '@'+nickname

    // console.log(tagNickname)

    db.select('*').from('users')
    .join('comments', 'comments.user_id', 'users.id')
        .where('users.nickname', '=', `${tagNickname}`)
        .orderBy('created_at', 'DESC')
        .then((comments) => {

            // console.log(comments)

            res.status(200).json(comments);
        })
        .catch(err => {
            // console.log(err)
            if(!err.statusCode){

                err.statusCode = 500;
            }
    
            err.message = "Error getting user comments by nickname."
    
            next(err);
            res.json([])
        });

}

export const handleGetCommentsByTag = (req, res, next, db) => {

    // INSERT INTO tag_comment( tag_id, comment_id )

    const { id } = req.params

    db.distinct('*').from('tag_comment')
    .join("comments", "tag_comment.comment_id", "comments.comment_id")
    .join("users", "users.id", "comments.user_id")
    .where('tag_id', '=', `${id}`)
    .orderBy('created_at', 'desc')
    .then(data => {

        res.status(200).json(data);
    })
    .catch(err => {
        // console.log(err)
        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error getting comments by tag."

        next(err);
        res.json([])
    });


}

export const handleGetTagByName = (req, res, next, db) => {

    const { name } = req.params

    // console.log(name)

    const hashName = "#"+name 

    db.distinct("*").from("tags")
    .join("tag_comment", "tag_comment.tag_id", "tags.tag_id")
    .join("comments", "tag_comment.comment_id", "comments.comment_id")
    .join("users", "users.id", "comments.user_id")
    .where('tags.tag_name', '=', `${hashName}`)
    .orderBy('created_at', 'desc')
    .then(data => {

        // console.log(data)
        res.status(200).json(data);
    })
    .catch(err => {
        // console.log(err)
        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error getting comments by tag name."

        next(err);
        res.json([])
    });
}




