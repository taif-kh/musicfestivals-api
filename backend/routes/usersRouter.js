const { Router } = require('express');
const usersRouter = Router();
const { PrismaClient } = require('@prisma/client');
const passport = require('passport');
const prisma = new PrismaClient();


usersRouter.get('/', async (req, res) => {
    response = await prisma.users.findMany({
    });
    res.json(response);
});

usersRouter.get('/:id', async (req, res) => {
    const userId = Number(req.params.id);
    response = await prisma.users.findUnique({
        where: {
            id: userId,
        },
    });
    res.json(response);
});

usersRouter.delete('/current/:current/remove/:remove', async (req, res) => {
    const currentUser = Number(req.params.current);
    const toRemoveUser = Number(req.params.remove);

    try {
        if (currentUser !== 4) {
            return res.status(403).json({ error: "Unauthorized to perform this action." });
        }

        const response = await prisma.users.delete({
            where: {
                id: toRemoveUser,
            },
        });

        return res.status(200).json({ message: "User removed successfully", data: response });
    } catch (error) {
        console.error("Error deleting user:", error);

        return res.status(500).json({ error: "An error occurred while deleting the user" });
    }
});

module.exports = usersRouter;
