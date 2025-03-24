import express, { Router } from 'express';
import { getCategories, insertCategories } from '../controllers/categories.controller.js';
const router = Router()
import { upload } from '../middlewares/multer.middleware.js'

router.post('/insert-category', upload.single('image'), insertCategories)
router.get('/get-category', getCategories)



export default router