       MongoDb task  
Design database for Zen class programme

1. Users Collection json

{
    "_id": ObjectId(),
    "name": "John Doe",
    "email": "john.doe@example.com",
    "mobile": "1234567890",
    "role": "student", // or "mentor", "admin"
    "batch": "B1",
    "mentee_count": 20 // applicable for mentors
}
2. Codekata Collection
json

{
    "_id": ObjectId(),
    "user_id": ObjectId("user_id"),
    "problems_solved": 100
}
3. Attendance Collection
json

{
    "_id": ObjectId(),
    "user_id": ObjectId("user_id"),
    "date": ISODate("2020-10-20T00:00:00Z"),
    "status": "present" // or "absent"
}
4. Topics Collection
json

{
    "_id": ObjectId(),
    "topic_name": "MongoDB Basics",
    "date_taught": ISODate("2020-10-15T00:00:00Z"),
    "tasks": [
        {
            "task_name": "Create MongoDB Collections",
            "status": "completed"
        }
    ]
}
5. Tasks Collection
json

{
    "_id": ObjectId(),
    "user_id": ObjectId("user_id"),
    "task_name": "Create MongoDB Collections",
    "submitted": true,
    "submission_date": ISODate("2020-10-18T00:00:00Z")
}
6. Company Drives Collection
json

{
    "_id": ObjectId(),
    "company_name": "Google",
    "drive_date": ISODate("2020-10-25T00:00:00Z"),
    "students_appeared": [
        ObjectId("user_id_1"),
        ObjectId("user_id_2")
    ]
}
7. Mentors Collection
json

    "_id": ObjectId(),
    "mentor_name": "Jane Smith",
    "mentees": [
        ObjectId("user_id_1"),
        ObjectId("user_id_2"),
        // More mentees
    ]
}



1.Find all the topics and tasks which are thought in the month of October

db.topics.find({
    "date_taught": {
        $gte: ISODate("2020-10-01T00:00:00Z"),
        $lt: ISODate("2020-11-01T00:00:00Z")
    }
});


2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

db.company_drives.find({
    "drive_date": {
        $gte: ISODate("2020-10-15T00:00:00Z"),
        $lt: ISODate("2020-11-01T00:00:00Z")
    }
});


3.Find all the company drives and students who are appeared for the placement.

db.company_drives.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "students_appeared",
            foreignField: "_id",
            as: "students"
        }
    }
]);



4.Find the number of problems solved by the user in codekata


db.codekata.aggregate([
    {
        $group: {
            _id: "$user_id",
            total_problems_solved: { $sum: "$problems_solved" }
        }
    }
]);



5.Find all the mentors with who has the mentee's count more than 15

db.mentors.find({
    "mentees": { $size: { $gt: 15 } }
});


6.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020


db.mentors.find({
    "mentees": { $size: { $gt: 15 } }
});
