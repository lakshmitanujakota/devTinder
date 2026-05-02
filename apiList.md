## API we are creating

 # authRouters
 - post/signup
 - post/login
 - post/logout

 # profileRouters
 - get/profile/view
 - patch/profile/edit
 - patch/profile/password

 # requestRouters
 - POST /request/interested/:userid
 - POST /request/ignored/:userid
 - POST /request/accepted/:requestid
 - POST /request/rejected/:requestid
 
 # userRouters
 - GET /user/connections
 - GET /user/request
 - GET /user/feed

  status: [ignored, interested, accepted, rejected]