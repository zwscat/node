var fs = require('fs')
var dbPath = './db.json'

exports.find = function (callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err)
		}
		callback(null, JSON.parse(data).students)
	})
}

exports.findById = function (id, callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err)
		}

		var students = JSON.parse(data).students

		var ret = students.find(function (item) {
			return item.id === parseInt(id)
		})

		callback(null, ret)
	})
} 

exports.save = function (student, callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err)
		}

		/*获取的数据默认就是字符串，所以要转成对象*/
		var students = JSON.parse(data).students

		student.id = students[students.length - 1].id + 1

		students.push(student)

		var fileData = JSON.stringify({
			students : students
		})

		fs.writeFile(dbPath, fileData, function (err) {
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})

}

exports.update = function (student, callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err)
		}

		var students = JSON.parse(data).students

		student.id = parseInt(student.id)
		
		var stu = students.find(function (item) {
			return item.id === student.id
		})

		for (var key in student) {
			stu[key] = student[key]
		}

		var fileData = JSON.stringify({
			students : students
		})
		 
		fs.writeFile(dbPath, fileData, function (err) {
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})
}

exports.delete = function (id, callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err)
		}

		var students = JSON.parse(data).students
		
		var deleteId = students.findIndex(function (item) {
			return item.id === parseInt(id)
		})

		//根据下标删除数据
		students.splice(deleteId, 1)

		var fileData = JSON.stringify({
			students : students
		})

		fs.writeFile(dbPath, fileData, function (err) {
			if (err) {
				return callback(err)
			}
			callback(null)
		})

	})
}