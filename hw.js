let express = require('express')
let bodyParser = require('body-parser');
let app = express()
let router = express.Router()
const PORT = 80

let people = {
    list: [
        { id: 111, name: "Warodom", surname: "Werapun", major: "CoE", gpa: "3.3" },
        { id: 112, name: "John", surname: "Lennon", major: "SE", gpa: "2.87" }]
}
//npm init --y
//npm i -s express
//npm i -s body-parser

app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

//all bears
router.route('/people')
    .get((req, res) => res.json(people.list))
    .post((req, res) => {           //ดึงข้อมูลและเพิ่มข้อมูลได้ในฐานข้อมูล
        let id = (people.list.length) ? people.list[people.list.length - 1].id + 1 : 1
        let name = req.body.name
        let surname = req.body.surname
        let major = req.body.major
        let gpa = req.body.gpa
        people = { list: [...people.list, { id, name, surname, major, gpa }] }
        res.json(people.list)
    })

//each bear    
router.route('/people/:people_id')
    .get((req, res) => {
        let id = people.list.findIndex((item) => (item.id == +req.params.people_id))
        res.json(people.list[id])
    })

    //http://localhost/api/people
    //อัพเดตค่า
    .put((req, res) => {
        let id = people.list.findIndex((item) => (item.id == +req.params.people_id))
        console.log("id = ", id)
        if (id == -1) {
            res.json("Not Found")
        }
        else
            people.list[id].name = req.body.name
            people.list[id].surname = req.body.surname
            people.list[id].major = req.body.major
            people.list[id].gpa = req.body.gpa
            res.json(people.list)
    })
    //ลบค่า

    
    .delete((req, res) => {
        const people_id = req.params.people_id
        console.log('people: ', people_id)
        let id = people.list = people.list.filter(item => item.id !== +req.params.people_id)
        console.log("id = ", id)
        if (id == -1) {
            res.json("Not Found")
        }
        else {
            people.list = people.list.filter(item => (+item.id !== +people))
        }
        res.json(people.list)
    })

app.listen(PORT, () => console.log('Server is running at ', PORT))