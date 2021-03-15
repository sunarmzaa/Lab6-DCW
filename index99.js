let express = require('express')
let bodyParser = require('body-parser');
let cors = require('cors')
let app = express()
let router = express.Router()
const PORT = 80

let bears = {
    list: [
        { id: 1, name: "Winny", weight: 50 },
        { id: 2, name: "Pooh", weight: 60 }]
}

//npm init --y
//npm i -s express
//npm i -s body-parser
app.use(cors());
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

//all bears
router.route('/bears')
    .get((req, res) => res.json(bears))
    .post((req, res) => {           //ดึงข้อมูลและเพิ่มข้อมูลได้ในฐานข้อมูล
        let id = (bears.list.length) ? bears.list[bears.list.length - 1].id + 1 : 1
        let name = req.body.name
        let weight = req.body.weight
        bears = { list: [...bears.list, { id, name, weight }] }
        res.json(bears)
    })

//each bear    
router.route('/bears/:bears_id')
    .get((req, res) => {
        let id = bears.list.findIndex((item) => (item.id == +req.params.bears_id))
        res.json(bears.list[id])
    })

    //http://localhost/api/bears/...
    //อัพเดตค่า
    .put((req, res) => {
        let id = bears.list.findIndex((item) => (item.id == +req.params.bears_id))
        bears.list[id].name = req.body.name
        bears.list[id].weight = req.body.weight
        res.json(bears)

    })
    //ลบค่า
    .delete((req, res) => {
        bears.list = bears.list.filter(item => item.id !== +req.params.bears_id)
        res.json(bears.list)
    })

app.listen(PORT, () => console.log('Server is running at ', PORT))