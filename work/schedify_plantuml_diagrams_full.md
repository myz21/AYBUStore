# Schedify – Full PlantUML Diagram Set

Bu doküman, SRS içinde geçen tüm UML diyagramları için PlantUML kodlarını içerir.

---

# 1. Use Case Diagram

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor Administrator
actor "Department Coordinator" as Coordinator
actor Instructor
actor Student

rectangle Schedify {
  usecase "Login" as UC1
  usecase "Manage Users" as UC2
  usecase "Manage Courses" as UC3
  usecase "Manage Students" as UC4
  usecase "Manage Instructors" as UC5
  usecase "Manage Classrooms" as UC6
  usecase "Define Exam Time Slots" as UC7
  usecase "Set Instructor Availability" as UC8
  usecase "Generate Exam Schedule" as UC9
  usecase "View Exam Schedule" as UC10
  usecase "Manually Adjust Schedule" as UC11
  usecase "Generate Reports" as UC12
  usecase "Import Data" as UC13
  usecase "Export Schedule" as UC14
}

Administrator --> UC1
Administrator --> UC2
Administrator --> UC6
Administrator --> UC7
Administrator --> UC9
Administrator --> UC11
Administrator --> UC13
Administrator --> UC14
Administrator --> UC10

Coordinator --> UC1
Coordinator --> UC3
Coordinator --> UC4
Coordinator --> UC5
Coordinator --> UC10
Coordinator --> UC12

Instructor --> UC1
Instructor --> UC8
Instructor --> UC10

Student --> UC1
Student --> UC10
@enduml
```

---

# 2. Activity Diagram – Exam Scheduling Workflow

```plantuml
@startuml
start

:Login to System;

if (Authorized?) then (Yes)
  :Import Academic Data;
  :Manage Courses / Students / Instructors;
  :Define Constraints;
  :Define Exam Time Slots;
  :Set Instructor Availability;

  :Run Scheduling Engine;

  if (Solution Found?) then (Yes)
    :Generate Schedule;
    :Review Schedule;

    if (Manual Adjustment Needed?) then (Yes)
      :Adjust Schedule;
      :Validate Constraints;
    endif

    :Publish Schedule;
    :Generate Reports;
    :Export Schedule;
  else (No)
    :Suggest Relaxing Constraints;
  endif

else (No)
  :Display Login Error;
endif

stop
@enduml
```

---

# 3. Sequence Diagram – User Authentication

```plantuml
@startuml
actor User
participant UI
participant AuthService
participant Database

User -> UI : Enter credentials
UI -> AuthService : authenticate(username,password)
AuthService -> Database : validateUser()
Database --> AuthService : user data

alt valid credentials
  AuthService --> UI : JWT token
  UI --> User : Redirect to dashboard
else invalid credentials
  AuthService --> UI : authentication failed
  UI --> User : Show error
end
@enduml
```

---

# 4. Sequence Diagram – Managing User Accounts

```plantuml
@startuml
actor Administrator
participant UI
participant UserService
participant Database

Administrator -> UI : Add/Edit/Delete User
UI -> UserService : submit changes
UserService -> Database : CRUD operation
Database --> UserService : success/failure
UserService --> UI : result
UI --> Administrator : confirmation
@enduml
```

---

# 5. Sequence Diagram – Managing Course Data

```plantuml
@startuml
actor "Department Coordinator" as Coordinator
participant UI
participant CourseService
participant Database

Coordinator -> UI : Manage course
UI -> CourseService : add/update/delete course
CourseService -> Database : save course data
Database --> CourseService : status
CourseService --> UI : response
UI --> Coordinator : display result
@enduml
```

---

# 6. Sequence Diagram – Managing Student Data

```plantuml
@startuml
actor "Department Coordinator" as Coordinator
participant UI
participant StudentService
participant Database

Coordinator -> UI : Manage student
UI -> StudentService : CRUD student/enrollment
StudentService -> Database : update records
Database --> StudentService : status
StudentService --> UI : response
UI --> Coordinator : confirmation
@enduml
```

---

# 7. Sequence Diagram – Managing Instructor Data

```plantuml
@startuml
actor "Department Coordinator" as Coordinator
participant UI
participant InstructorService
participant Database

Coordinator -> UI : Manage instructor
UI -> InstructorService : CRUD instructor
InstructorService -> Database : save instructor data
Database --> InstructorService : result
InstructorService --> UI : response
UI --> Coordinator : confirmation
@enduml
```

---

# 8. Sequence Diagram – Managing Classroom Data

```plantuml
@startuml
actor Administrator
participant UI
participant ClassroomService
participant Database

Administrator -> UI : Manage classroom
UI -> ClassroomService : CRUD classroom
ClassroomService -> Database : save classroom
Database --> ClassroomService : status
ClassroomService --> UI : response
UI --> Administrator : confirmation
@enduml
```

---

# 9. Sequence Diagram – Defining Exam Time Slots

```plantuml
@startuml
actor Administrator
participant UI
participant TimeSlotService
participant Database

Administrator -> UI : Define time slots
UI -> TimeSlotService : create/update slots
TimeSlotService -> Database : save slots
Database --> TimeSlotService : success
TimeSlotService --> UI : response
UI --> Administrator : display confirmation
@enduml
```

---

# 10. Sequence Diagram – Setting Instructor Availability

```plantuml
@startuml
actor Instructor
participant UI
participant AvailabilityService
participant Database

Instructor -> UI : Set availability
UI -> AvailabilityService : submit availability
AvailabilityService -> Database : save availability
Database --> AvailabilityService : status
AvailabilityService --> UI : response
UI --> Instructor : confirmation
@enduml
```

---

# 11. Sequence Diagram – Generating Exam Schedule

```plantuml
@startuml
actor Administrator
participant UI
participant SchedulerEngine
participant ConstraintValidator
participant Database

Administrator -> UI : Generate schedule
UI -> SchedulerEngine : start scheduling
SchedulerEngine -> ConstraintValidator : validate constraints
ConstraintValidator --> SchedulerEngine : constraints valid
SchedulerEngine -> Database : fetch data
Database --> SchedulerEngine : courses/students/rooms
SchedulerEngine -> SchedulerEngine : run CSP algorithm
SchedulerEngine -> Database : save schedule
SchedulerEngine --> UI : generated schedule
UI --> Administrator : display result
@enduml
```

---

# 12. Sequence Diagram – Viewing Exam Schedule

```plantuml
@startuml
actor User
participant UI
participant ScheduleService
participant Database

User -> UI : View schedule
UI -> ScheduleService : get schedule
ScheduleService -> Database : retrieve schedule
Database --> ScheduleService : schedule data
ScheduleService --> UI : schedule
UI --> User : display schedule
@enduml
```

---

# 13. Sequence Diagram – Manually Adjusting Schedule

```plantuml
@startuml
actor Administrator
participant UI
participant ScheduleService
participant ConstraintValidator
participant Database

Administrator -> UI : Modify exam slot
UI -> ScheduleService : update schedule
ScheduleService -> ConstraintValidator : validate update

alt valid update
  ConstraintValidator --> ScheduleService : valid
  ScheduleService -> Database : save changes
  Database --> ScheduleService : success
  ScheduleService --> UI : updated schedule
else invalid update
  ConstraintValidator --> ScheduleService : invalid
  ScheduleService --> UI : constraint violation
end

UI --> Administrator : result
@enduml
```

---

# 14. Sequence Diagram – Generating Schedule Reports

```plantuml
@startuml
actor "Department Coordinator" as Coordinator
participant UI
participant ReportService
participant Database

Coordinator -> UI : Generate report
UI -> ReportService : request report
ReportService -> Database : collect schedule data
Database --> ReportService : report data
ReportService --> UI : generated report
UI --> Coordinator : download/view report
@enduml
```

---

# 15. Sequence Diagram – Importing Data

```plantuml
@startuml
actor Administrator
participant UI
participant ImportService
participant Database
participant ExternalSystem

Administrator -> UI : Upload file/API endpoint
UI -> ImportService : import request
ImportService -> ExternalSystem : fetch data
ExternalSystem --> ImportService : external data
ImportService -> Database : store imported data
Database --> ImportService : success
ImportService --> UI : import result
UI --> Administrator : confirmation
@enduml
```

---

# 16. Sequence Diagram – Exporting Data

```plantuml
@startuml
actor Administrator
participant UI
participant ExportService
participant Database

Administrator -> UI : Export schedule
UI -> ExportService : export request
ExportService -> Database : retrieve schedule
Database --> ExportService : schedule data
ExportService --> UI : generated PDF/CSV/iCal
UI --> Administrator : download file
@enduml
```

---

# 17. Analysis Object Model (Class Diagram)

```plantuml
@startuml
class User {
  +id : Long
  +username : String
  +password : String
  +role : Role
}

class Student {
  +studentId : String
  +department : String
}

class Instructor {
  +instructorId : String
  +availability : String
}

class Administrator

class DepartmentCoordinator

class Course {
  +courseId : String
  +courseName : String
  +difficultyScore : int
}

class Classroom {
  +roomId : String
  +capacity : int
  +location : String
}

class Exam {
  +examId : String
  +date : Date
  +timeSlot : String
}

class Schedule {
  +scheduleId : String
  +status : String
}

class Constraint {
  +constraintId : String
  +type : String
}

class TimeSlot {
  +slotId : String
  +startTime : DateTime
  +endTime : DateTime
}

User <|-- Student
User <|-- Instructor
User <|-- Administrator
User <|-- DepartmentCoordinator

Course "1" -- "*" Student : enrolls
Instructor "1" -- "*" Course : teaches
Exam "1" -- "1" Course
Exam "1" -- "1" Classroom
Schedule "1" -- "*" Exam
Constraint "*" -- "1" Schedule
TimeSlot "1" -- "*" Exam
@enduml
```

---

# 18. Component Diagram

```plantuml
@startuml
package Frontend {
  [React UI]
}

package Backend {
  [Auth Service]
  [Scheduling Engine]
  [Constraint Manager]
  [Reporting Service]
  [Import/Export Service]
}

database PostgreSQL

[React UI] --> [Auth Service]
[React UI] --> [Scheduling Engine]
[React UI] --> [Constraint Manager]
[React UI] --> [Reporting Service]
[React UI] --> [Import/Export Service]

[Auth Service] --> PostgreSQL
[Scheduling Engine] --> PostgreSQL
[Constraint Manager] --> PostgreSQL
[Reporting Service] --> PostgreSQL
[Import/Export Service] --> PostgreSQL
@enduml
```

---

# 19. Deployment Diagram

```plantuml
@startuml
node "Client Browser" {
  component "React Frontend"
}

node "Application Server" {
  component "Spring Boot API"
  component "Scheduling Engine"
}

database "PostgreSQL DB"

cloud "Cloud Infrastructure\n(AWS/GCP/Azure)"

"React Frontend" --> "Spring Boot API"
"Spring Boot API" --> "Scheduling Engine"
"Spring Boot API" --> "PostgreSQL DB"
"Application Server" --> "Cloud Infrastructure\n(AWS/GCP/Azure)"
@enduml
```

---

# 20. State Diagram – Exam Schedule Lifecycle

```plantuml
@startuml
[*] --> Draft
Draft --> Generated : Generate Schedule
Generated --> Reviewed : Review Schedule
Reviewed --> Adjusted : Manual Adjustment
Adjusted --> Published : Publish Schedule
Published --> Archived : Archive
@enduml
```

