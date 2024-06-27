import { Hono, Context } from "hono";
import {
    getbook,
    listBooks,
    createbook,
    updatebook,
    deletebook
} from "./book-controller"


export const bookRouter = new Hono();



bookRouter
    .get("/books", listBooks)
    .get("/books/:id", getbook)
    .post("/create-book", createbook)
    .put("/update-book/:id", updatebook)
    .delete("/delete-book/:id", deletebook)
