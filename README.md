# Rest_API_Mentor-and-Student-Assigning-with-Database

Created an RestAPI with multiple endpoints to create a student and mentor, with one endpoint we can assign particular student to a mentor or multiple students to one mentor , with one endpoint we can change the mentor assigned to a students and we can get all the students which are under one mentor and we can get previous mentor for particular student

## Documentation

API

```bash
https://assign-mentor-student-restapi.onrender.com
```

Totally 6 endpoints

#### 1. Endpoint To add a student in DB

POST :

```bash
https://assign-mentor-student-restapi.onrender.com/api/students/addStudent
```

Request Body :

studentName (string, required): The name of the student.

studentEmail (string, required): The email of the student.

#### 2.Endpoint To add a mentor in DB

POST :

```bash
https://assign-mentor-student-restapi.onrender.com/api/students/addMentor
```

Request Body :

mentorName (string, required): The name of the mentor.

mentorEmail (string, required): The email of the mentor.

#### 3. Endpoint is used to assign a mentor to a student

POST :

```bash
https://assign-mentor-student-restapi.onrender.com/api/students/studentToMentor
```

Request Body :

studentName (string, required): The name of the student

studentEmail (string, required): The email of the student

mentorName (string, required): The name of the mentor

mentorEmail (string, required): The email of the mentor

#### 4. This endpoint is used to change the mentor for a student with the specified studentName

PUT :

```bash
https://assign-mentor-student-restapi.onrender.com/api/students/changeMentor/{studentName}
```

Param : StudentName which student need mentor change

Request Body :

mentorName (string, optional): The name of the new mentor for the student

mentorEmail (string, optional): The email of the new mentor for the student

#### 5.This endpoint makes an HTTP GET request to retrieve information about a specific student. The request should include the student ID in the URL path. The response will be in JSON format with a "msg" key containing an array of data related to the student.

GET :

```bash
https://assign-mentor-student-restapi.onrender.com/api/students/getStudents/{mentorID}
```

No request body is required for this endpoint.
Path Parameters :

mentorId (string, required): The unique identifier of the student.

#### 6.This endpoint retrieves the previous mentor of a student identified by their ID.

```bash
https://assign-mentor-student-restapi.onrender.com/api/students/getPreviousMentor/{studentID}
```

Request :
No request body is required for this endpoint.

studentId (path parameter) : The unique identifier of the student for whom the previous mentor information is to be retrieved.
