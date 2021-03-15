let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
const PORT = 80
app.use(cors());
// Check lab 6
let student = {
    list: [
        { "id": "4010341", "name": "Winnie", "surname": "Pooh", "major": "CoE", "GPA": 3.3 },

        { "id": "4010342", "name": "Foo", "surname": "Bar", "major": "CoE", "GPA": 2.3 }
    ]
}
// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

router.route('/student')
    .get((req, res) => res.json(student.list))
    .post((req, res) => {
        //let id = (student.list.length) ? student.list[student.list.length - 1].id + 1 : 1

        let id = req.body.id
        let name = req.body.name
        let surname = req.body.surname
        let major = req.body.major
        let GPA = req.body.GPA
        student = { list: [...student.list, { id, name, surname, major, GPA }] }
        res.json(student.list)
    })

router.route('/student/:student_id')
    .get((req, res) => {

        let id = student.list.findIndex((item) => (item.id === req.params.student_id))


        if (id !== -1) {  //home work lab 6
            res.json(student.list[id])

        }
        else {
            res.send('Not found')

        }
       
    })
    .put((req, res) => {
        let id = student.list.findIndex((item) => (item.id === req.params.student_id))
        if (id !== -1) {
        student.list[id].id = req.body.id
        student.list[id].name = req.body.name
        student.list[id].surname = req.body.surname
        student.list[id].major = req.body.major
        student.list[id].GPA = req.body.GPA
        res.json(student.list[id])
        }
        else {
            res.send('Not found')

        }
    })

    .delete((req, res) => {
        student.list = student.list.filter((item) => item.id !== req.params.student_id)
        res.json(student.list)
    })

app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(PORT, () => console.log('server is running at port:' + PORT))
