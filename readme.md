# Instalation

 1. `npm install`
 2. rename `env` to `.env`
 3. Configure `.env` file
 4. Create mongodb database: `absensiDB`
 5. Collection: `absensi, izinRequests, users, workDays`
 6. run `npm start`
 7. Test on postman, download postman collection [here](www.test.fs)
 8. Import collection to Postman
 9. Pay atention on Environment Variable, there is 3 variable `base_url, admin_token, user_token`
 10. set `admin_token` using jwt that you get from login using admin account, and do same thing for `user_token` set it using jwt from employe login
 
# Route Explanation

## USER Route

    -CREAT admin and Employe Account
    -Login

 **POST** `/user/admin`

> Create admin account

    Request Body
    {
	    "number":  "000001",
	    "fullName":  "Admin",
	    "password":  "123123"
	}

> number: must unique

 **POST** `/user/employe`
> Create Employe account
> Auth: Bearer Token (Admin)
> 

    Request Body
    { 
   	   "number":  "000002",
   	   "fullName":  "Employe 1",
   	   "password":  "123123"
   	}
> number: must unique'

 
 **POST** `/user/auth`
> Login for Admin and Employe
> Auth: No Auth

    Request Body
    { 
	   	 "number":  "000001",
	   	 "password":  "123123"
   	}

## WORK DAY

> Work Day must be created so Employe can check-in.


 **POST** `/workday`
> Create Workday
> Auth: Bearer Token (Admin)

    Request Body
    { 
	   	 "date":  "01-05-2023", 
	   	 "start_time":  "01-05-2023 09:00:00",
	   	 "end_time":  "01-05-2023 16:00:00"
   	}
   	

 1. Valid Date Format `DD-MM-YYYY HH:mm:ss`

 **GET** `/workday`
> Get All WorkDay that already created
> Auth: Bearer Token (Admin)

    Response
    { 
	   	 "message":  "Succes geeting workday history!",
	   	 "data":  [
			{
			   	 "id":  "6460d5905630f2f2853cbaa4",
			   	 "date":  "01-05-2023",
			   	 "start_time":  "01-05-2023 09:00:00",
			   	 "end_time":  "01-05-2023 16:00:00"
			},
			{
				"id":  "6460d61c5630f2f2853cbaae",
				"date":  "02-05-2023",
				"start_time":  "02-05-2023 09:00:00",
				"end_time":  "02-05-2023 16:00:00"
			}
		]
   	}


  
## ABSENSI
 **POST** `/absensi/check-in`
> Check-In for spesific workDay
> **Datetime usually generated in server not in client, but for testing purpose it will send by client**
> Auth: Bearer Token (Employe)

    Request Body
    { 
	   	 "date":  "01-05-2023",
	   	 "datetime":  "01-05-2023 08:55:00"
   	}

 - Date on `date` and `datetime` must be the same.
 - Different date on `date` and `datetime` will be causing check-in failed
 - This is for security purpose, so employee can't check-in from other day
 - If employee have *'izin'* for this day, Employee unable to check-in
  
**POST** `/absensi/check-out`
> Check-Out for specific workDay
> **Datetime usually generated in server not in client, but for testing purpose it will send by client**
> Auth: Bearer Token (Employe)

    Request Body
    { 
	   	 "date":  "02-05-2023",
	   	 "datetime":  "02-05-2023 16:10:00"
   	}

 - Date on `date` and `datetime` must be the same.
 - Different date on `date` and `datetime` will be causing check-out failed
 - This is for security purpose, so employee can't check-in from other day
 - Employee can't check-out if not check-in before
 - If Employee check-in after `start_time`(late) **OR** check-out before `end_time` (early), the status will be `notOnTime`
  - On other hand check-in before `start_time`(early) **OR** check-out after `end_time` (late), the status will be `hadir`
  
 **GET** `/absensi/history`
> Get All absensi record that has been done
> Auth: Bearer Token (Employe)

    Response
    { 
	   	 "message":  "Success get absensi history!",
	   	 "data":  [
		   	 {
			   	 "id":  "6460d5905630f2f2853cbaa8",
			   	 "workDay":  "01-05-2023",
			   	 "checkIn":  "01-05-2023 08:51:00",
			   	 "checkOut":  "01-05-2023 16:01:00",
			   	 "status":  "hadir"
			 },
			 {
				"id":  "6460d8315630f2f2853cbabc",
				"workDay":  "02-05-2023",
				"checkIn":  "02-05-2023 09:11:00",
				"checkOut":  "02-05-2023 16:08:00",
				"status":  "notOnTime"
			}
		]
}

 - `notOnTime` mean Employe check-in Late OR check-out to Early
   
 ## IZIN REQUST
 **POST** `/izin`
> Make a permit/izin application
>
> Auth: Bearer Token (Employe)

    Request Body
    { 
	   	"start_date":  "03-05-2023",
	   	"end_date":  "03-05-2023",
	   	"note":  "Acara Penting"
	}

 - Valid Date Format `DD-MM-YYYY`'
 - `start_date` and `end_date` can be different if permit application is more then 1 day
  


**GET** `/izin`
> Get or See All Permit Application that has been send
> Auth: Bearer Token (Employe) OR (Admin)

    Response
    { 
	   	"message":  "Success geting all request!",
	   	"data":  [
			{
				"id":  "6460dc845630f2f2853cbad3",
				"employe_name":  "Employe 1",
				"start_date":  "03-05-23 00:00:00",
				"end_date":  "03-05-23 23:59:59",
				"note":  "Acara Penting",
				"status":  "processed",
			},
			{
				"id":  "6460dcdb5630f2f2853cbad9",
				"employe_name":  "Employe 1",
				"start_date":  "04-05-23 00:00:00",
				"end_date":  "05-05-23 23:59:59",
				"note":  "Liburan",
				"status":  "reject",
			}
		]
	}

 - If request do by Employe the result will be only to specific to that Employee, but if Admin make a request will be return ALL permit applicaation form ALL Employe
 
  **PUT** `/izin/:id`
> Update a permit/izin application
> Auth: Bearer Token (Employe)

    Request Body
    { 
	   	"start_date":  "03-05-2023",
	   	"end_date":  "03-05-2023",
	   	"note":  "Acara Keluarga"
	}

 - Valid Date Format `DD-MM-YYYY`'
 - `start_date` and `end_date` can be different if permit application is more then 1 day
 - `:id` params is permit aplication id. ex: `6460dcdb5630f2f2853cbad9`
 - Update cen be performed **ONLY** if status of permit aplication is `processed` and not `reject` or `approve`
 
 **DELETE** `/izin/:id`
> Delete a permit/izin application
> Auth: Bearer Token (Employe)
    
 - `:id` params is permit aplication id. ex: `6460dcdb5630f2f2853cbad9`
 - Delete cen be performed **ONLY** if status of permit aplication is `processed` and not `reject` or `approve` 
 
 **PATCH** `/izin/:id`
> Update status of permit/izin application: reject or approve
> Auth: Bearer Token (Admin)

    
    Request Body
    { 
	   	"isApprove":  Boolean
	}

 - Boolean: `true` or `false`
 - `:id` params is permit aplication id. ex: `6460dcdb5630f2f2853cbad9`


# REPORT

**GET** `/report?start_date=01-05-2023&end_date=30-05-2023`
> Get or See report of all employee based on date range
> Auth: Bearer Token (Employe) OR (Admin)

    Response
    {
		"message":  "Success Generate Report",
		"data":  [
			{
				"_id":  "6460d4b75630f2f2853cba9e",
				"number":  "000002",
				"fullName":  "Employe 1",
				"hadir":  5,
				"alpha":  0,
				"notOnTime":  1,
				"izin":  1,
				"rejected":  0
			},
			{
				"_id":  "6460d4be5630f2f2853cbaa1",
				"number":  "000003",
				"fullName":  "Employe 2",
				"hadir":  3,
				"alpha":  1,
				"notOnTime":  2,
				"izin":  0,
				"rejected":  1
			}
		]
}

 - Query Paramas `start_date` and `end_date` must be valid date format `DD-MM-YYYY`
 - `start_date` must be less or equal then `end_date`
 