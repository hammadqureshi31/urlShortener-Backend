import express from "express";
import { handleCreateNewShortId, handleFindAllURLs, handleGetAnalytics, handleGetVisitHistory } from "../controller/urlControl.js";
import { checkForAuthenticationCookie } from "../middlewears/auth.js"; // Corrected path

const router = express.Router();

router.get('/', handleFindAllURLs);

router.post('/', checkForAuthenticationCookie('token'), handleCreateNewShortId);

router.get('/:shortId', handleGetVisitHistory);

router.get('/analytics/:shortId', handleGetAnalytics);

export default router;
