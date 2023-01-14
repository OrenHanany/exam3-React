// All the routes that connect the the DB and client.
import express, {NextFunction, Request, Response} from 'express';
import exam3logic from '../Logic/exam3logic';


// generic router 
const router = express.Router();

router.get("/groups/all", async (request: Request, response: Response, next: NextFunction) => {
    console.log("rest test");
    response.status(200).json(await exam3logic.getAllGroups());
})

router.get("/", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json("controller working");
})

// gets information from DB
router.get("/all", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json( await exam3logic.getAllMeat())
})

//get single student

router.post("/add", async (request: Request, response: Response, next: NextFunction) => {
  const body = request.body;
  response.status(201).json( await exam3logic.addMeat(body))
})

router.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    response.status(200).json( await exam3logic.getSingleMeat(id));
})

router.get("/group/:id", async (request: Request, response: Response, next: NextFunction) => {
  const id = +request.params.id;
  response.status(200).json( await exam3logic.getAllbygroup(id));
})


// delete information from DB
router.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const id = +request.params.id;
  response.status(204).json( await exam3logic.deleteMeat(id))
})


export default router;