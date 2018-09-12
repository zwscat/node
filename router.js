var fs = require('fs')

/*Express提供的一种专门用来包装路由的*/
var express = require('express')

//创建一个路由容器
var router = express.Router()

var Student = require('./student')

//把路由都挂载到router路由容器中

router.get('/students', function (req, res) {
	Student.find(function (err, students) {
		if (err) {
			return res.status(500).send('server error.')
		}
		
		res.render('index.html', {
			fruits: [
			'苹果',
			'香蕉',
			'橘子'
			],
			students : students
		})
	})
})

router.get('/students/new', function (req, res) {
	res.render('new.html')
})

router.post('/students/new', function (req, res) {
	Student.save(req.body, function (err) {
		if (err) {
			return res.status(500).send('server error.')
		}
		res.redirect('/students')
	})
})

router.get('/students/edit', function (req, res) {
	Student.findById(parseInt(req.query.id) ,function (err, student) {
		if (err) {
			return res.status(500).send('server error.')
		}

		res.render('edit.html', {
			student : student
		})
	})
})

router.post('/students/edit', function (req, res) {
	Student.update(req.body, function(err) {
		if (err) {
			return res.status(500).send('server error.')
		}

		res.redirect('/students')
	})
})

router.get('/students/delete', function (req, res) {
	Student.delete(req.query.id, function(err) {
		if (err) {
			return res.status(500).send('server error.')
		}

		res.redirect('/students')
	})
})

module.exports = router