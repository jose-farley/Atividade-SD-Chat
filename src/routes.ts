import { Response, Request, Router } from "express";
import { createClient } from 'redis';

const router = Router();

router.get("/", async (req:Request, res:Response) => {
    res.render("index");
})

export {router}