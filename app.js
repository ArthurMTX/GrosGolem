const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});

if (!process.env.DISCORD_TOKEN) {
    console.error('Le token n\'a pas été trouvé.');
    process.exit(1);
}

client.once(Events.ClientReady, () => {
    console.log(`Le bot est prêt ! Connecté en tant que ${client.user.tag}.`);
});

const responseConfig = [
    { triggers: ['quoi', 'koi', 'qoua', 'koua', 'qoa'], responses: ['feur', 'coubeh'] },
    { triggers: ['oui', 'ui', 'voui'], responses: ['stiti'] },
    { triggers: ['non', 'nn'], responses: ['bril'] },
    { triggers: ['sa', 'ça', 'ca'], responses: ['lade'] },
    { triggers: ['oki'], responses: ['doki'] },
    { triggers: ['qui', 'ki'], responses: ['kette'] },
    { triggers: ['toi'], responses: ['ture'] },
    { triggers: ['hein', 'hyn', 'un'], responses: ['deux'] },
    { triggers: ['si'], responses: ['tron'] },
    { triggers: ['ah'], responses: ['beille'] },
    { triggers: ['ouais'], responses: ['stern'] },
    { triggers: ['bon'], responses: ['soir'] },
    { triggers: ['tard'], responses: ['tiflette'] },
    { triggers: ['go'], responses: ['lem'] },
];

function normalizeContent(content) {
    return content.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/g,"").trim().toLowerCase();
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase().trim();
    const normalizedContent = normalizeContent(content);

    for (const { triggers, responses } of responseConfig) {
        if (triggers.some(trigger => content.endsWith(trigger) || normalizedContent.endsWith(trigger))) {
            const reply = getRandomResponse(responses);
            console.log(`Réponse à ${reply} pour ${message.author.tag}`);
            await message.reply(reply);
            return;
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
