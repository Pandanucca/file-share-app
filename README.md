File Sharing App


## Overview

This project uses Node, Express, React and MongoDB and provides access to files that can be shared. Users can register and login. It will even allow for uploads of large documents (more than 16MB) because of the usage of multer to break them down into smaller files. A Node application will allow for web transfers and the files can be sent via emails using Express. Additional features can be added such as automatic deletion of files after a certain time limit.


## Data Model

The application will store Users, Filename, Size, Timestamps, Senders and Receivers

* users can have upload multiple documents
* users will be able to send and receive documents from each other
* each file will have be linked to the uploader and have the size and timestamp of the upload


An Example User:

```javascript
[
    {_id: "1", username: "user1", password: "Test1234"
    },
    {_id: "2", username: "user2", password: "Test12345"
    },
];
```

An Example File:

```javascript
    {_id: "1",
    userId: "1", 
    name: "resume.doc", 
    type: "application/word", 
    size: 1000, 
    location: "https://myserver.com/docs/resume.doc", 
    privacy: 1
    },
    {_id: "2",
    userId: "2", 
    name: "budget.xls", 
    type: "application/excel", 
    size: 2000, 
    location: "https://server2.com/docs/budget.xls", 
    privacy: 1
    }
```


## [Link to Commented First Draft Schema](db.mjs)


## Wireframes

/home - home page and list of uploaded files

![home](documentation\home.jpg)

/login - page for logging in or signing up

![list](documentation\login-signup.jpg)

/modifyprofile - page for modifying profile and adjusting sharing/privacy settings

![list](documentation\modify-profile.jpg)

## Site map

## [Link to Site map](documentation\sitemap.jpg)



## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can upload files
4. as a user, I can view all of the files I've uploaded and other users have uploaded
5. as a user, I can send files to other users
6. as a user, I can delete files I've uploaded


