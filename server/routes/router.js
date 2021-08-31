const express=require('express');
const route=express.Router();
const service=require('../services/render');

route.get('/', service.homeRoutes)
route.get('/add_user', service.add_user)
route.get('/update_user', service.update_user)

module.exports=route