import {Router} from 'express';
const UnauthorizedRouter = Router();
UnauthorizedRouter.get('/redirect', (req, res)=>{
    res.send('Unauthorized access')
})
export default UnauthorizedRouter;