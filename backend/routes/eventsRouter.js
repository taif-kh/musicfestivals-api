const { Router } = require('express');
const eventsRouter = Router();
const { PrismaClient } = require('@prisma/client');
const passport = require('passport');
const prisma = new PrismaClient();

eventsRouter.get('/', async (req, res) => {
    response = await prisma.events.findMany({
        orderBy: {
            date: "desc",
        },
    });
    res.json(response);
});

eventsRouter.get('/user/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    response = await prisma.events.findMany({
        orderBy: {
            date: "desc",
        },
        where: {
            postedBy: userId,
        },
    });
    res.json(response);
});

eventsRouter.post('/:api', async (req, res) => {
    const apiKey = req.params.api;
    
    let user = await prisma.users.findUnique({
        where: {
            apiKey,
        },
    }); 

    if (user === undefined) {
        return res.status(403).json({ error: "Unauthorized to perform this action." });
    }

    const postedBy = parseInt(user.id, 10);
    const { name, description, date, city, country, artist, imgUrl } = req.body;
    // const postedBy = parseInt(req.body.postedBy);
    const ticketPrice = parseFloat(req.body.ticketPrice);
    response = await prisma.events.create({
        data: {
            name, description, date, city, country, ticketPrice, artist, imgUrl, postedBy
        },
    });

    res.json(response);

});



eventsRouter.get('/:id', async (req, res) => {
    const eventId = Number(req.params.id);
    response = await prisma.events.findUnique({
        where: {
            id: eventId,
        },
    });
    res.json(response);
});



// Update one event
eventsRouter.put('/:api', async (req, res) => {
    const eventId = Number(req.body.id);
    const { name, description, date, city, country, artist, imgUrl, isFree } = req.body;
    const apiKey = req.params.api;

    let user = await prisma.users.findUnique({
        where: {
            apiKey,
        },
    });

    if (!user)
        {
        return res.status(403).json({ error: "Unauthorized to perform this action." });
    }

    response = await prisma.events.update({
        where: {
            id: eventId,
        },
        data: {
            name, description, date, city, country, artist, imgUrl, isFree
        },
    });
    res.json(response);
});





eventsRouter.delete('/api/:api/event/:eventId', async (req, res) => {
    const apiKey = req.params.api;
    const eventId = Number(req.params.eventId);

    let event = await prisma.events.findUnique({
        where: {
            id: eventId,
        },
    });

    let user = await prisma.users.findUnique({
        where: {
            apiKey,
        },
    });


    let postedBy = parseInt(event.postedBy);

    try {


        const response = await prisma.events.delete({
            where: {
                id: eventId,
            },
        });

        return res.status(200).json({ message: "Event removed successfully", data: response });
    } catch (error) {
        console.error("Error deleting user:", error);

        return res.status(500).json({ error: "An error occurred while deleting the event" });
    }
});


eventsRouter.get('/artist/:artist', async (req, res) => {
    const artist = req.params.artist;
    response = await prisma.events.findMany({
        where: {
            artist,
        },
    });
    res.json(response);
});

eventsRouter.get('/city/:city', async (req, res) => {
    const city = req.params.city;
    response = await prisma.events.findMany({
        where: {
            city,
        },
    });
    res.json(response);
});


//----SPECIFIC PUTs-----------------------------------------------------------
// Update free
eventsRouter.put('/isFree/:api', async (req, res) => {
    const eventId = Number(req.body.id);
    const { isFree } = req.body;
    const apiKey = req.params.api;

    let user = await prisma.users.findUnique({
        where: {
            apiKey,
        },
    });

    if (!user)
        {
        return res.status(403).json({ error: "Unauthorized to perform this action." });
    }

    response = await prisma.events.update({
        where: {
            id: eventId,
        },
        data: {
            isFree,
        },
    });
    res.json(response);
});



eventsRouter.put('/name/:api', async (req, res) => {
    const eventId = Number(req.body.id);
    const { name } = req.body;
    const apiKey = req.params.api;

    let user = await prisma.users.findUnique({
        where: {
            apiKey,
        },
    });

    if (!user)
        {
        return res.status(403).json({ error: "Unauthorized to perform this action." });
    }

    response = await prisma.events.update({
        where: {
            id: eventId,
        },
        data: {
            name,
        },
    });
    res.json(response);
});


eventsRouter.put('/description/:api', async (req, res) => {
    const eventId = Number(req.body.id);
    const { description } = req.body;
    const apiKey = req.params.api;

    let user = await prisma.users.findUnique({
        where: {
            apiKey,
        },
    });

    if (!user)
        {
        return res.status(403).json({ error: "Unauthorized to perform this action." });
    }

    response = await prisma.events.update({
        where: {
            id: eventId,
        },
        data: {
            description,
        },
    });
    res.json(response);
});



eventsRouter.put('/date/:api', async (req, res) => {
    const eventId = Number(req.body.id);
    const { date } = req.body;
    const apiKey = req.params.api;

    let user = await prisma.users.findUnique({
        where: {
            apiKey,
        },
    });

    if (!user)
        {
        return res.status(403).json({ error: "Unauthorized to perform this action." });
    }

    response = await prisma.events.update({
        where: {
            id: eventId,
        },
        data: {
            date,
        },
    });
    res.json(response);
});


eventsRouter.put('/artist/:api', async (req, res) => {
    const eventId = Number(req.body.id);
    const { artist } = req.body;
    const apiKey = req.params.api;

    let user = await prisma.users.findUnique({
        where: {
            apiKey,
        },
    });

    if (!user)
        {
        return res.status(403).json({ error: "Unauthorized to perform this action." });
    }

    response = await prisma.events.update({
        where: {
            id: eventId,
        },
        data: {
            artist,
        },
    });
    res.json(response);
});



eventsRouter.put('/imgUrl/:api', async (req, res) => {
    const eventId = Number(req.body.id);
    const { imgUrl } = req.body;
    const apiKey = req.params.api;

    let user = await prisma.users.findUnique({
        where: {
            apiKey,
        },
    });

    if (!user)
        {
        return res.status(403).json({ error: "Unauthorized to perform this action." });
    }

    response = await prisma.events.update({
        where: {
            id: eventId,
        },
        data: {
            imgUrl,
        },
    });
    res.json(response);
});



eventsRouter.put('/ticketPrice/:api', async (req, res) => {
    const eventId = Number(req.body.id);
    const { ticketPrice } = req.body;
    const apiKey = req.params.api;

    let user = await prisma.users.findUnique({
        where: {
            apiKey,
        },
    });

    if (!user)
        {
        return res.status(403).json({ error: "Unauthorized to perform this action." });
    }


    response = await prisma.events.update({
        where: {
            id: eventId,
        },
        data: {
            ticketPrice,
        },
    });
    res.json(response);
});

module.exports = eventsRouter;