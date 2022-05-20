const router = require('express').Router();
const User = require('./model/user');
const Post = require('./model/post')
const Notification = require('./model/notification')
const bycript = require('bcrypt');
const async = require('hbs/lib/async');
//-----router cho đăng nhập------------------
router.get('/', (req,res) => {
    res.render('Home');
})

//-----router cho đăng nhập, Đăng ký----------------
router.get('/login', (req,res) => {
    res.status(200).render('Login')
})
router.post('/signup', async function(req,res) {
    try{
        const data = req.body;
        //mã hóa mật khẩu:
        const salt = await bycript.genSalt(10);
        const hasedPassword = await bycript.hash(data.password, salt);
        const newUser = new User({
            firstName: data.firstName,
            surName: data.SurName,
            email: data.email,
            password: hasedPassword,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender
        })
        //lưu vào db:
        await newUser.save();
        return res.status(200).json({status:'success'})
    }catch{
        return res.status(400).json({error: 'Some error happened'})
    }
})
router.post('/login', async function(req,res) {
    const data = req.body;
    try{
        //tìm với tên ng dùng trong database:
        const user = await User.findOne({
            email: data.userEmail
        })
        //nếu ko tìm đc:
        if(!user){
            res.status(401).json('Wrong username or passwors');
        }else{
            //mã hóa và so sánh mật khẩu người dùng nhập vào với mật khẩu trong db:
            const validPassword = await bycript.compare(data.userPassword, user.password);
            if(!validPassword) return res.status(401).json('Wrong username or passwors');
            return res.status(200).json({id:user.id, mess: 'success', isAdmin: user.isAdmin})
        }
    }catch{
        return res.status(400).json({error: 'Some error happened'})
    }
})
//-----router cho user--------------------
router.get('/user', (req,res) => {
    res.status(200).render('User');
})
//single post
router.get('/singlepost/:id', (req,res) => {
    res.status(200).render('SinglePost');
})
//------router cho donate ------------------
router.get('/donate', (req,res) => {
    res.status(200).render('Donate');
})
//----router cho notification--------
router.get('/notification', (req,res) => {
    res.status(200).render('Notification');
})
//router cho forgotpassword
router.get('/forgot', (req,res)=> {
    res.status(200).render('Forgotpassword');
})
//router cho admin
router.get('/admin', (req,res) => {
    res.status(200).render('admin')
})
router.get('/admin/users', (req,res) => {
    res.status(200).render('users');
})
router.get('/admin/posts', (req,res) => {
    res.status(200).render('posts');
})
//-------Lấy thông tin ng dùng----------
router.post('/user', async (req,res) => {
    try{
        const id = req.body.id;
        const user = await User.findOne({_id: id});
        if(!user){
            res.status(401).json('user is not authenticated');
        }else{
            res.status(200).json({firstName: user.firstName, surName:  user.surName, email: user.email, gender: user.gender, dob: user.dateOfBirth, avatar: user.avatar, isAdmin: user.isAdmin})
        }
    }catch{
        res.status(401).json('user is not authenticated');
    }
})

//-------------Thêm bài viết----------------
router.post('/post', async (req,res) => {
    const postData = req.body;
    try{
        const newPost = new Post({
            content: postData.content,
            image: postData.image,
            userId: postData.userId,
            tags: postData.tags
        })
        const saved = await newPost.save();
        res.status(200).json(saved);
    }catch(err){
        res.status(500).json('Something wrong is happened');
    }
})
//lấy tất cả post về
router.post('/posts', async (req,res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    }catch{
        res.status(500).json('Something wrong is happened');
    }
})
//lấy tất cả user về
router.post('/users', async (req,res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch{
        res.status(500).json('Something wrong is happened');
    }
})
//comment
router.post('/comment', async (req,res) => {
    try{
        const commentData = req.body;
        const post = await Post.findByIdAndUpdate(commentData.postID, {
            $push: {
                comments: {
                    userID: commentData.userID,
                    comment: commentData.comment,
                    time: commentData.time
                }
            }
        });
        res.status(200).json(post)
    }catch(err){
        console.log(err);
        res.status(500).json("Something wrong is happened");
    }
})
//-------Thay ảnh đại diện------------------
router.post('/avatar', async (req,res) => {
    try{
        const {imagePath, userID}  = req.body;
        await User.findByIdAndUpdate(userID, {
            $set: {
                avatar: imagePath
            }
        })
        res.status(200).json('Avatar updated');
    }catch(err){
        res.status(500).json("Something wrong is happened");
    }
})
//------Cập nhật thông tin người dùng
router.post('/userupdate',async(req,res) => {
    try{
        const data = req.body;
        await User.findByIdAndUpdate(data.id, {
            $set: {
                firstName: data.firstName,
                surName: data.surName,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth,
                email: data.email
            }
        })
        res.status(200).json('User updated');
    }catch{
        res.status(500).json("Something wrong is happened");
    }
})

//------------Thêm thông báo-----------------
router.post('/notification', async (req,res) => {
    try{
        const data = req.body;
        const newNotificaion = await new Notification({
            postId: data.postID,
            content: data.content,
            fromUser: data.from,
            notiType: data.type,
            userId: data.userId
        })
        await newNotificaion.save();
        res.status(200).json('Saved notification');
    }catch{
        res.status(500).json('Something wrong is happened');
    }
})
//lấy về  thông báo
router.post('/notifications', async (req,res) => {
    try{
        const notifications = await Notification.find({userId: req.body.userId});
        res.status(200).json(notifications);
    }catch{
        res.status(500).json('Something wrong is happened');
    }
})
//xóa thông báo:
router.post('/deletenoti', async (req,res) => {
    try{
        await Notification.findByIdAndDelete(req.body.id);
        res.status(200).json('Removed');
    }catch{
        res.status(500).json('Something wrong is happened');
    }
})
//---Xóa người dùng-------------
router.post('/deleteuser', async (req,res)=> {
    try{
        await User.findByIdAndDelete(req.body.id);
        await Post.deleteMany({userId: req.body.id})
        res.status(200).json('User deleted');
    }catch{
        res.status(500).json('Something wrong is happened');
    }
})
//SET thành admin
router.post('/setadmin', async (req,res) => {
    try{
        await User.findByIdAndUpdate(req.body.id, {
            $set: {
                isAdmin: true
            }
        });
        res.status(200).json('This user now is admin');
    }catch{
        res.status(500).json('Something wrong is happened');
    }
})
router.post('/deletepost', async (req,res) => {
    try{
        await Post.findByIdAndDelete(req.body.id);
        res.status(200).json('Post deleted');
    }catch{
        res.status(500).json('Something wrong is happened');
    }
})
module.exports = router