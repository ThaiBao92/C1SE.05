const express = require('express');
const hbs = require('hbs')
const app = express();
const path = require('path')
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
//khởi tạo dotenv:
dotEnv.config();
//kết nối tới mongodb:
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('Đã kết nối tới MongoDB')).catch(err => {
    console.log(err)
})
//lấy đường dẫn thư mục asset:
const asset_directory = path.join(__dirname, './assets')
//lấy đường dẫn thư mục view:
const view_directory = path.join(__dirname, './view');
//lấy đường dẫn router:
const router = require('./router');
//đặt view engine thành hbs:
app.set('view engine', 'hbs');
app.set('views', view_directory);
//cho phép app đoc dữ liệu dạng json:
app.use(express.json())
app.use(router);
//sử dụng thư mục asset:
app.use(express.static(asset_directory));

//upload ảnh:
const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null, "assets/img");
    },filename: (req,file,callback) => {
        callback(null, req.body.name);
    }
})
const upload = multer({storage: storage});
app.post("/upload", upload.single("file"), (req,res) => {
    res.status(200).json("File uploaded");
})
app.listen('8080', () => {
    console.log('Server khởi chạy tại port 8080');
})