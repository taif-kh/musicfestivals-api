const { Router } = require('express');
const keyRouter = Router();
const { PrismaClient } = require('@prisma/client');
const passport = require('passport');
const prisma = new PrismaClient();




keyRouter.post("/:id", async (req, res) => {
    const userId = Number(req.params.id);

    try {
        let userDetails = await prisma.users.findUnique({
            where: { id: userId },
        });

        if (!userDetails) {
            return res.status(404).json({ error: "User not found" });
        }

        let apiKey = "my_api_key_is_70c50a90b1n" + Math.random().toString();

        await prisma.users.update({
            where: { id: userId },
            data: { apiKey },
        });

        let response = await prisma.users.findUnique({
            where: { id: userId },
        });

        return res.json(response);
    } catch (error) {
        console.error("Error generating API key:", error);
        res.status(500).json({ error: "An error occurred while generating the API key" });
    }
});

module.exports = keyRouter;