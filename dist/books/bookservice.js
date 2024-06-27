"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookService = void 0;
exports.getBookById = getBookById;
exports.createBookService = createBookService;
exports.updateBookService = updateBookService;
exports.deleteBookService = deleteBookService;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
const getBookService = async (limit) => {
    if (limit) {
        return await db_1.default.query.books.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.books.findMany();
};
exports.getBookService = getBookService;
async function getBookById(id) {
    return db_1.default.select().from(schema_1.books).where((0, drizzle_orm_1.eq)(schema_1.books.id, id));
}
async function createBookService(data) {
    await db_1.default.insert(schema_1.books).values(data);
    return "Book created successfully";
}
async function updateBookService(id, book) {
    await db_1.default.update(schema_1.books).set(book).where((0, drizzle_orm_1.eq)(schema_1.books.id, id));
    return "Book updated successfully";
}
async function deleteBookService(id) {
    await db_1.default.delete(schema_1.books).where((0, drizzle_orm_1.eq)(schema_1.books.id, id));
    return "Book deleted successfully";
}
