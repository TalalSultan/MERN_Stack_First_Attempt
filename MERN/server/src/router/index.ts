import express, { Router } from 'express';

import { login, register } from "../controllers/authentication";
import url from 'url'


const router = express.Router();

router.get('/', (req, res) => {
    res.render('register');
});
router.post('/auth/register', (req, res) => {
    const body = req.body;
    console.log("im in authentication.ts at post rn");
    console.log(body);
    register(req, res)
});
router.post('/auth/login', (req, res) => {
    const body = req.body;
    console.log('in authinticatoin login');
    console.log(body);
    const user = login(req, res).then(value => {
        if (!value["username" as keyof typeof value]) {//means the server sent an error
            return
        }

        const name = value["username" as keyof typeof value];
        const email = value["email" as keyof typeof value]
        // res.redirect(url.format({
        //     pathname:'http://localhost:3000/profile/'+name,
        //     query:{
        //         name:name.toString(),
        //         email:email.toString(),
        //     }
        // }))
        res.json(value)
    });

})
router.get('/register', (req, res) => {
    res.render("register");
})
router.get('/login', (req, res) => {
    res.render("login");
})

router.get('/profile/:username', (req, res) => {
    const username = req.params.username;
    const data = req.query;
    console.log(data);
    const userData = {
        username: username,
        email: data.email
    }
    res.render("profile", { data: userData });
    // res.json(userData);

})


export default router;
