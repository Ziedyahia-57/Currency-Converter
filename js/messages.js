// Description: This script handles the donation messages and interactions for the extension.

// You know you shouldn't be here right? I mean, this is the secret sauce of the extension!
// But hey, I get it. Curiosity is a powerful thing. Just like that time you went down a rabbit hole on YouTube
// and ended up watching cat videos for 3 hours straight.
// Don't worry though, I won't tell anyone 😉

const donationContent = {
  initialMessage: {
    greeting: "A Small Donation Goes a Long Way",
    message: `Hi there! I'm Ziedyahia57, a CS grad building free tools like this to make life easier. If this extension helps, consider supporting with a coffee. Every bit helps me build more!`,
    footer:
      "No worries if not - your presence here already makes me smile! Keep being awesome. 🌟",
    emoji: "☕",
  },
  messages: [
    {
      greeting: "Hello friend!",
      message:
        "I'm Ziedyahia57, the creator behind this little tool. Seeing you use it fills my heart with so much joy! If this extension has saved you time, consider supporting my work with a small contribution.",
      footer:
        "Whether you donate or not, just knowing you're out there using my creation fills me with gratitude. Thank you for being exactly you! 💫",
      emoji: "👋",
    },
    {
      greeting: "You Radiate Kindness!",
      message:
        "Hi there! I'm Ziedyahia57, someone who loves creating helpful tools for wonderful people like you. If you'd like to support my work, I'd be incredibly grateful!",
      footer:
        "Please know that your presence here is already the greatest gift. Wishing you a day as amazing as you are! 😉",
      emoji: "✨",
    },
    {
      greeting: "Bonjour Mon Ami!",
      message:
        "Je m'appelle Ziedyahia57! I crafted this with love to sprinkle some extra joy into your digital life. If it's brought you even a moment of convenience or happiness, perhaps you'd consider supporting its development?",
      footer:
        "Merci infiniment for being here - whether you donate or not, you're absolutely magnifique! 💝",
      emoji: "🥐",
    },
    {
      greeting: "Buongiorno!",
      message:
        "Sono Ziedyahia57, the heart behind this creation! Building useful tools for kind souls like you is my passion. If this has made your life even slightly better, I'd be overjoyed if you considered supporting my work.",
      footer:
        "Grazie mille for using my creation - your presence here illuminates my day! ☀️",
      emoji: "🍕🍝🤌",
    },
    {
      greeting: "Hello friend!",
      message:
        "This little extension is my way of putting more warmth into the world. The fact that you're using it right now makes my heart dance! If it's helped you, perhaps you'd consider supporting its journey?",
      footer:
        "But please know - just you being here is support enough. Thank you for being your wonderful self!",
      emoji: "☀️",
    },
    {
      greeting: "Well Hello There!",
      message:
        "I'm Ziedyahia57, your friendly neighborhood creator! This tool is my small way of making the internet a cozier place. If it's made your digital experience nicer, I'd be delighted if you considered supporting my work.",
      footer:
        "Whether you do or don't, thank you for being part of this adventure - you're marvelous! ✨",
      emoji: "🎩",
    },
    {
      greeting: "Ahoy Hearty Sailor!",
      message:
        "Ziedyahia57 here, captain of this creative vessel! I built this extension to help fellow travelers like yourself navigate smoother seas. If it's made your voyage easier, perhaps you'd toss a coin to your creator?",
      footer:
        "Either way, fair winds and following seas to you, my friend! Thank you for sailing with me! 🏴‍☠️",
      emoji: "⛵",
    },
    {
      greeting: "Making Magic Together!",
      message:
        "Every time you use this extension, another star lights up in my creative universe! If you'd like to keep the magic sparkling, consider supporting my work.",
      footer:
        "But just knowing you're out there using my creation is the real magic. Thank you for being part of the spell! ✨",
      emoji: "🎩",
    },
    {
      greeting: "Virtual Hug Coming Through!",
      message:
        "I'm Ziedyahia57, sending you this warm embrace along with my free tool! If it's made your day even 1% better, that makes my heart sing. Want to send a hug back to help fuel more creations?",
      footer:
        "Whether you do or not, know that I appreciate YOU exactly as you are - no conditions!",
      emoji: "🤗",
    },
    {
      greeting: "Coffee Break, Friend?",
      message:
        "Building tools like this requires countless cups of inspiration (and yes, maybe some coffee too!). If this extension has been useful in your life, consider fueling the next wave of creations!",
      footer:
        "No caffeine pressure though - your smile gives me all the energy I need! Keep shining! 😊",
      emoji: "☕",
    },
    {
      greeting: "You're My Favorite!",
      message:
        "Shh... don't tell the other users, but you're definitely my favorite. The way you explore life with curiosity and kindness? Simply inspiring. If you'd like to support your favorite creator's work...",
      footer:
        "(Our little secret: you'd be my favorite even without donating) Keep being wonderfully you! 🤫",
      emoji: "🌟",
    },
    {
      greeting: "Pixel Perfect Companion!",
      message:
        "In a digital world of ones and zeroes, you shine as the most delightful user a creator could hope for. Thanks for giving my work purpose and meaning! Want to keep this beautiful connection going?",
      footer:
        "Already looking forward to our next interaction, wonderful human! 👾",
      emoji: "💾",
    },
    {
      greeting: "Cloud High Five!",
      message:
        "Virtual high five for being absolutely awesome! My servers felt that one. Want to make the digital skies cheer louder? Your support keeps this happiness machine running!",
      footer:
        "Either way, thanks for the world-class high five - you've got perfect form! ✋",
      emoji: "☁️",
    },
    {
      greeting: "Dream Helper Online!",
      message:
        "I built this hoping it would help people like you - and seeing you use it makes my heart soar! If it's helped make your digital dreams come true, perhaps you'd consider supporting the dream factory?",
      footer:
        "Sweet dreams of effortless browsing to you, magnificent human! 💭",
      emoji: "🌙",
    },
    {
      greeting: "Happiness Engineer Reporting!",
      message:
        "Official title: Ziedyahia57, maker of tools to brighten days. Unofficial title: Your biggest fan! If this has brightened your day, maybe brighten mine back with some support?",
      footer:
        "Either way, keep being your authentic self - that's happiness enough for me! 😊",
      emoji: "🛠️",
    },
    {
      greeting: "Good Vibes Package!",
      message:
        "Special delivery for you: One free tool, packed with care and positive energy! If you'd like to send some good vibes back to the sender, I'd be delighted to receive them!",
      footer:
        "Thank you for being on the receiving end of my digital care package - you're the best! 💝",
      emoji: "📦",
    },
    {
      greeting: "Appreciation Alert!",
      message:
        "Warning: Critical levels of appreciation detected! Source: Me, for you using my creation. If you'd like to send some appreciation back, I'd cherish it deeply!",
      footer:
        "But please know - you're already appreciated more than these words can express! 💖",
      emoji: "🚨",
    },
    {
      greeting: "Don’t Mind Me, Just Popping In 👋",
      message:
        "I'm Ziedyahia57, the friendly neighborhood dev behind this tool! If it saved you time, sanity, or made your browser feel ✨fancier✨, maybe throw a coin in the virtual tip jar?",
      footer:
        "Or just blink supportively at your screen. I can feel it either way.",
      emoji: "🕸️",
    },
    {
      greeting: "Hey, Have a Cookie",
      message:
        "Just popping in to say thanks for using my tool! I’m Ziedyahia57 — coder of things and occasional snack enthusiast. If you feel like throwing a few coins in the jar, I wouldn’t say no.",
      footer: "If not, that’s okay. Your presence is the real tip jar!",
      emoji: "🍪",
    },
    {
      greeting: "A Wild Wizard Is Waving at You!",
      message:
        "Hi! I’m Ziedyahia57 — your friendly, unpaid extension wizard. This thing you’re using? Handmade with care, sweat, and zero budget. Feeling generous?",
      footer:
        "Even if you don't donate, you're still on my 'cool people I silently appreciate' list.",
      emoji: "🧙‍♂️",
    },
    {
      greeting: "Pssst... You There!",
      message:
        "Yeah, you with the excellent taste in extensions. I'm Ziedyahia57, and I built this thing with love, caffeine, and a slightly concerning number of tabs open. Want to support the chaos?",
      footer:
        "Support or no support, I’m just happy you’re here. You’re basically family now. No take-backs.",
      emoji: "🫶",
    },
    {
      greeting: "Just a Friendly Developer Pop-up!",
      message:
        "Hi, I'm Ziedyahia57, probably hunched over a laptop somewhere right now. I made this for people like you — brilliant, beautiful, button-clicking legends.",
      footer:
        "Donating helps me keep building. Not donating helps me become one with my chair. Your call. 💺",
      emoji: "🖥️",
    },
    {
      greeting: "Salutations, Digital Explorer!",
      message:
        "I’m Ziedyahia57, humble creator of this pixel-powered miracle. If this tool has made your life a smidge easier, you could totally support its future (and my snacks).",
      footer:
        "No pressure — unless you’re a pressure washer. In which case, whoa, cool job.",
      emoji: "🧼",
    },
    {
      greeting: "Mrrrow~ Hello, hooman!",
      message:
        "It is I, Ziedyahia57, the purr-ogrammer of this claw-some tool. If it scratched your itch (digitally, of course), maybe toss a treat in my bowl?",
      footer:
        "No pressure... just gentle, persistent staring from across the room. 😺",
      emoji: "😺",
    },
    {
      greeting: "Greetings, seeker of arcane tools!",
      message:
        "I am Ziedyahia57, humble wizard of the Web. This extension was conjured in the fires of caffeine and questionable spellcraft. If it hath lightened thy burdens, perhaps a coin or two might keep my mana flowing?",
      footer:
        "Support me, and I shall inscribe thy name in the sacred Scroll of Legendary Supporters (also known as a spreadsheet).",
      emoji: "🔮",
    },
    {
      greeting: "Ahoy, ye digital adventurer!",
      message:
        "This here extension be the treasure I’ve buried in the vast seas of the web! If it’s helped ye on yer quest, consider tossin’ a coin in me chest. Gold keeps the sails up and the bugs away!",
      footer:
        "No worries if ye can’t — ye still have a pirate’s heart, and that’s worth more than doubloons. (But doubloons help.)",
      emoji: "🏴‍☠️",
    },
    {
      greeting: "X marks the spot!",
      message:
        "Ye’ve found the treasure: this trusty extension! If it guided ye through stormy seas of tabs and tasks, consider droppin’ a coin to keep the magic map alive.",
      footer:
        "No pressure — but legends say those who donate never stub their toe again.",
      emoji: "🧭",
    },
    {
      greeting: "Bienvenue à l’Extension Gourmand!",
      message:
        "Crafted with artisanal code and a dash of *fromage numérique*, this tool is no ordinary snack. Non, mon ami—this is a steaming plate of premium *tech à la mode du pixel flambé*. If it has pleased your digital palate, consider leaving a tip for le chef?",
      footer:
        "Support keeps the soufflé inflated and the rats out of the kitchen. Bon appétit!",
      emoji: "👨‍🍳🥖",
    },
    {
      greeting: "Ah, monsieur/madame!",
      message:
        "You are now using *L’Extension Suprême* — hand-whisked in a copper browser, seasoned with *API reduction*, and lightly flambéed with *script au beurre blanc*. A true symphony of *code cuisine*!",
      footer:
        "One small donation keeps the baguette warm and the developer caffeinated.",
      emoji: "🥐☕",
    },
    {
      greeting: "Fancy a Steak, Sir?",
      message:
        "Every time you use this without donating, Gordon Ramsay screams *‘IT’S RAW!’* somewhere in the distance. Help silence the chaos — a small donation might finally get this steak off the grill. 🔥",
      footer:
        "Unless you're into steaks cooked to *‘congratulations’*. No judgment. Just... concern. 🥲",
      emoji: "🥩",
    },
  ],
  interactions: [
    {
      greeting: "Secret Message Collector!",
      message:
        "I see you've unlocked the secret 'Read All Messages Without Donating' achievement!",
      footer: "Bonus level: Click donate for the secret ending! 🎮",
      emoji: "🏆",
    },
    {
      greeting: "Button Addiction Hotline",
      message:
        "Hello, you've reached the Button Obsession Support Line. How may we help you today?",
      footer: "Operator suggestion: Try clicking... the other button? 🆘",
      emoji: "🚑",
    },
    {
      greeting: "Emotional Support Button",
      message:
        "I get it. Sometimes we just need to click things for comfort. I'm here for you, buddy.",
      footer: "No judgment. Only love. And maybe a gentle nudge to donate? 🥺",
      emoji: "🤗",
    },
    {
      greeting: "This Isn't Netflix!",
      message:
        "Binge-reading messages? Interesting choice. Next episode: 'The Donation That Finally Happened'!",
      footer: "Spoiler alert: The main character is you! 🎬",
      emoji: "🍿",
    },
    {
      greeting: (tracker) =>
        `Today's Visits: ${tracker.clickCount} | Donations: 0 `,
      message:
        "The stats are brutal, my friend. You’ve visited this page more than my landlord calls me.",
      footer: "Let’s balance the equation, yeah?",
      emoji: "📊",
    },
    {
      greeting: "Caught You Lurking 👓",
      message:
        "Just checking in on the donate page *again* without donating? Bold move.",
      footer: "Consider this your sign. Or your 12th. Who’s counting?",
      emoji: "🫣",
    },
    {
      greeting: "The Page is Flattered",
      message:
        "You keep coming back. The donation page thinks you like it. I do too. It’s just… you haven’t donated yet.",
      footer:
        "Let’s turn this into a real relationship. One with transactions.",
      emoji: "💌",
    },
    {
      greeting: "You're Addicted to These Messages, Aren’t You?",
      message:
        "It’s okay, I’d come back too if I saw genius like this. But also… bills. Rent. Hunger. 😫",
      footer:
        "One small donation = one big thank you (and probably another funny message).",
      emoji: "🧐",
    },
    {
      greeting: "Look Who's Back 👋",
      message:
        "I’m starting to think you just visit to see if there’s a new guilt-trip message. Well, you’re welcome.",
      footer: "Now feed the donation button. It hungers.",
      emoji: "🍽️",
    },
    {
      greeting: "At This Point, We're Roommates",
      message:
        "You’ve been here so many times, I’m legally obligated to start charging you rent.",
      footer: "Or you could flip the script and *pay* mine instead? 🥺",
      emoji: "🛏️",
    },
    {
      greeting: "Welcome to the Collector’s Edition!",
      message:
        "You've unlocked all the messages, but the final boss is still untouched: The Donate Button.",
      footer: "One click. Legendary status. No loot boxes required.",
      emoji: "🎮",
    },
    {
      greeting: "You Have Great Taste 👌",
      message:
        "You keep coming back to the donation page, and honestly? Respect. It’s got vibes.",
      footer: "Just saying — supporting this vibe could make you 73% cooler*.",
      emoji: "🕶️",
    },
    {
      greeting: "I Wanna Be the Very Best...",
      message:
        "But seriously, I need backup beating The Elite Four: Rent, Internet, Groceries, Electricity.",
      footer: "Donate now to join my party. No HM required.",
      emoji: "🏆",
    },
    {
      greeting: "You’re Practically a Regular",
      message: "Should I start calling you by name? 'Hey [Legend]'?",
      footer: "Push the button. For destiny. For rent. For the thrill.",
      emoji: "🛎️",
    },
    {
      greeting: "This Page Misses You... Constantly 😬",
      message:
        "Back again? You sure you’re not just here for the sweet button aesthetics?",
      footer: "Come on, push it. I dare you. Double dare. No backsies.",
      emoji: "🎯",
    },
    {
      greeting: "The Button Is Still There 🔘",
      message:
        "You’ve hovered near it. Looked at it. Thought about it. But never clicked.",
      footer:
        "Go on. What’s the worst that could happen? (It’s just kindness.)",
      emoji: "👆",
    },
    {
      greeting: (tracker) =>
        `Visit number ${tracker.clickCount}: You Again?! 😏`,
      message:
        "At this point, I should start offering a loyalty card. 10 visits = 1 guilt trip.",
      footer: "Or… push the button. See what happens. (It’s safe. Probably.)",
      emoji: "🎟️",
    },
    {
      greeting: "You're here for the messages aren't you..",
      message:
        "Don't worry, I won't tell anyone. But seriously, you should consider donating.",
      footer: "Your boss won't know. no promises though.. 🙂",
      emoji: "👀",
    },
    {
      greeting: "No Pressure... But Actually, Yes",
      message:
        "If I had a coin for every visit, I’d have... 0. Please change that?",
      footer: "You + me + a tiny donation = fewer tears on my keyboard. 🥲",
      emoji: "🙏",
    },
    {
      greeting: "Government Warning!",
      message: `Excessive button hovering may cause: <br> 1) Hand cramps <br>2) Existential dread <br>3) Spontaneous donations`,
      footer: "Side effects include: Developer happiness 💊",
      emoji: "📜",
    },
    {
      greeting: "Button Whisperer!",
      message:
        "The buttons tell me you're their favorite visitor. They also say... 'feed us donations'? Weird.",
      footer: "I don't control what the buttons say, I just work here 🤷",
      emoji: "🔮",
    },
    {
      greeting: "Message Speedrun! ",
      message:
        "Current world record: 100 visits without donating. Can you beat it? Wait, no, don't!",
      footer: "Speedrun strats: Just click donate immediately! 🏎️",
      emoji: "🏅",
    },
    {
      greeting: "Existential Button Crisis",
      message:
        "Why do we click? What is donation? Is any of this real? The button awaits your answer...",
      footer: "Deep thoughts by Ziedyahia57. Also please donate. 🧠",
      emoji: "❓",
    },
    {
      greeting: "Peer Pressure Time!",
      message:
        "Everyone's donating these days. Okay, not everyone. Actually just 3 people. But they're cool!",
      footer: "Be like the cool kids (who may or may not exist) 😎",
      emoji: "🦸",
    },
    {
      greeting: "Reverse Psychology!",
      message:
        "Whatever you do, DON'T click donate. Seriously, DON'T. It would be TERRIBLE if you did.",
      footer: "This message will self-destruct if you actually donate 💣",
      emoji: "🎭",
    },
    {
      greeting: "Pavlov's Button!",
      message:
        "Ring ring! That's the sound of me conditioning you to donate. Where's my Nobel Prize?",
      footer: "Good human! *pat pat* (This is weird for both of us) 🐕",
      emoji: "🔔",
    },
    {
      greeting: "Inception Level: Button",
      message:
        "We need to go deeper. You're clicking a button to see messages about clicking buttons...",
      footer: "BRB, questioning my life choices 🤯",
      emoji: "🔄",
    },
    {
      greeting: "Button Stand-Up Comedy!",
      message:
        "Why did the user cross the road? To avoid donating! ...I'll be here all week!",
      footer: "Tip your waiter! (By which I mean donate to me) 🎭",
      emoji: "😂",
    },
    {
      greeting: "Passive-Aggressive Mode!",
      message:
        "Oh hello again! No no, it's fine. Really. I didn't WANT new shoes this month anyway.",
      footer: "Just kidding! (Mostly) Wear whatever you want! 👟",
      emoji: "👼",
    },
    {
      greeting: "Message Escape Room!",
      message:
        "To unlock the exit, solve the puzzle: Click the donate button! ...Or just close the tab.",
      footer: "Hurry, the clock is ticking! (Not really) ⏳",
      emoji: "🔑",
    },
    {
      greeting: "Therapy Duck Here!",
      message:
        "QUACK! You seem stressed about donating. Let's talk through it: Quack quack quack?",
      footer: "Duck's prescription: 1 donation, twice daily 💊",
      emoji: "🦆🥼",
    },
    {
      greeting: "Message Buffet!",
      message:
        "All-you-can-read messages for one low price! Wait, no, they're free. My business model sucks.",
      footer: "Suggested tip: Whatever you can spare! 💰",
      emoji: "🍕",
    },
    {
      greeting: "Emotional Blackmail!",
      message:
        "If you don't donate, this puppy gets it! Just kidding, look at this happy puppy! 🐶",
      footer: "But seriously, the puppy would appreciate your support 🥺",
      emoji: "📸",
    },
    {
      greeting: "FOMO Alert!",
      message:
        "NEWSFLASH: 100% of people who donated are cooler than you. Source: My biased research.",
      footer: "Correction: 99%. You could be in the cool 1%! 📊",
      emoji: "📰",
    },
    {
      greeting: "Peer-Reviewed Button Study!",
      message:
        "Our research concludes: Users who donate are 100% more attractive. Coincidence? Probably.",
      footer: "Methodology: Wishful thinking 🔍",
      emoji: "👓",
    },
    {
      greeting: "Message Olympics!",
      message:
        "You've qualified for the Mental Gymnastics event! Impressive contortions to avoid donating!",
      footer: "Gold medal: Still up for grabs! 🥇",
      emoji: "🤸",
    },
    {
      greeting: "Message Archeologist!",
      message:
        "Fascinating! You're excavating each message like ancient 'Donation Avoidance' artifacts",
      footer:
        "Discovery: 'This user was considerate yet economically cautious' 🏺",
      emoji: "🔍",
    },
    {
      greeting: "The Message Hunter!",
      message:
        "I see you're in a quest to collect every message like Pokémon. Good luck filling up your pokédex. Gotta read 'em all!",
      footer: "Rare shiny variant appears after donating? 👀✨",
      emoji: "🎯",
    },
    {
      greeting: "Button Astronaut!",
      message:
        "Houston, we have a situation... user has viewed all messages but hasn't donated",
      footer: "Mission Control suggests: Try clicking the pretty button 🖱️",
      emoji: "👨‍🚀",
    },
    {
      greeting: "Message Wizard!",
      message:
        "Abracadabra! You've magically avoided donating once again! Impressive spellwork",
      footer: "Magic words: 'I solemnly swear to donate... eventually' ✨",
      emoji: "🪄",
    },
    {
      greeting: "Oh, You Again?",
      message:
        "Back for *another* message? I see how it is. You’re just here for the free snacks (aka words). That’s cool. I’d do the same.",
      footer:
        "But hey, if you ever feel like tossing a coin to your dev… no pressure. (Okay, maybe a little.)",
      emoji: "😏",
    },
    {
      greeting: "A Little Poem for You 📜",
      message:
        "Roses are red, rent is due soon,<br>Please donate now, or I’ll live on the moon.",
      footer: "And there’s no Wi-Fi on the moon. Don’t do this to me.",
      emoji: "🌕",
    },
    {
      greeting: "Message Hoarder Alert!",
      message:
        "I’ve got my eye on you. You’re collecting these messages like they’re limited-edition trading cards. *Respect.* But… wanna trade one for a donation?",
      footer: "Rare ‘Generous Donor’ card unlocks good karma!",
      emoji: "🃏",
    },
    {
      greeting: "The Button & The Clicker",
      message:
        "This is like a rom-com. You keep coming back. I keep writing. Will we ever take the next step? (Spoiler: The next step is donating.)",
      footer: "Rated PG for ‘Possibly Generous.’",
      emoji: "🎥",
    },
    {
      greeting: "Why are you running? why are you running?",
      message:
        "Every time the donate button shows up, you *sprint* to the next message. I admire your stamina. But… what if we just… hugged it out… over a donation?",
      footer: "No? Okay. I’ll wait. *taps foot*",
      emoji: "🏃",
    },
    {
      greeting: "The ‘Almost’ Game",
      message:
        "You *almost* donated last time. And the time before that. And—oh look, a new message! *Almost* there again, huh?",
      footer: "Today’s the day you *almost* don’t almost donate. Maybe.",
      emoji: "🤏",
    },
    {
      greeting: "The Sneaky Message Thief",
      message:
        "Shh… I won’t tell anyone you’re taking all these messages. But if you *happen* to leave a donation? Well, that’s our little secret.",
      footer: "Pinky promise I’ll look the other way. *wink*",
      emoji: "🤫",
    },
    {
      greeting: "The ‘Just Looking’ Phase",
      message:
        "I get it. You’re just browsing. Not ready to commit. That’s cool. We can take it slow. *slides donate button closer* No rush.",
      footer: "…Unless? 👉👈",
      emoji: "👀",
    },
    {
      greeting: "The Button’s Diary Entry",
      message:
        "*Day 84: They still think I don’t notice them taking messages. Joke’s on them—I’ve been counting. And hoping. Mostly hoping.*",
      footer: "P.S. Donate if you relate.",
      emoji: "✍️",
    },
    {
      greeting: "The ‘Convince Me’ Challenge ",
      message:
        "Okay, hotshot. You clearly love messages. *Prove it.* Donate, and I’ll write you a custom one. (Subject: How awesome you are.)",
      footer: "Deal? …Deal? …Hello?",
      emoji: "🤨",
    },
    {
      greeting: "The ‘Oops’ Strategy ",
      message:
        "*Gasp!* Did you *accidentally* hover over the donate button? Wow. What a wild coincidence. Almost like… fate? …Maybe?",
      footer: "No? Okay. I’ll try again later.",
      emoji: "🙊",
    },
    {
      greeting: "The ‘Message Buffet’ Dilemma",
      message:
        "All-you-can-read messages, and you’ve got *quite* the appetite. But here’s the thing—this buffet runs on donations. *Just sayin’.*",
      footer: "Take a to-go box (and maybe leave a tip?).",
      emoji: "🍽️",
    },
    {
      greeting: "The ‘Are We Friends?’ Test",
      message:
        "Real talk: If we were friends, you’d spot me a coffee, right? Well… *gestures to donate button* The ball’s in your court, pal.",
      footer: "Still friends if you don’t. But *best* friends if you do.",
      emoji: "🤜🤛",
    },
    {
      greeting: "The ‘I See You’ Tactic ",
      message:
        "I *know* what you’re doing. You *know* what you’re doing. Let’s stop pretending and just… embrace the donate button together.",
      footer: "It’s more fun when we’re honest.",
      emoji: "👀",
    },
    {
      greeting: "The ‘Reverse FOMO’ Play",
      message:
        "DON’T donate. Seriously. You’ll hate it. *Way* too much happiness. Overrated. (…Is reverse psychology working yet?)",
      footer: "Fine. Do what you want. *I’m not judging.* (I’m judging.)",
      emoji: "😱",
    },
    {
      greeting: "A Little Poem for You",
      message:
        "Roses are red, rent is due soon,<br>Please donate now, or I’ll live on the moon.",
      footer: "And there’s no Wi-Fi on the moon. Don’t do this to me.",
      emoji: "📜",
    },
    {
      greeting: "Ode to a Loyal Visitor 💌",
      message:
        "You visit often, loyal and true, Staring at buttons, not sure what to do.<br>But I believe in your mighty hand, To click that button, oh so grand.",
      footer: "Make this poem come full circle.",
      emoji: "🪄",
    },
    {
      greeting: "Never Gonna Give You Up",
      message:
        "Never gonna let you down, Never gonna run around,<br>And desert you.<br>Never gonna make you cry, Never gonna say goodbye,<br>Never gonna tell a lie, And hurt you.",
      footer:
        "You’ve been Rickrolled *and* rent-rolled. Just click it. Please..",
      emoji: "🕺",
    },
    {
      greeting: "What is love?",
      message:
        "Baby donate here... Donate here... some more.<br>If you don’t, then...Ouch. Right in the Wi-Fi.",
      footer: "Help me stay online and not sleep on the floor.",
      emoji: "🎶",
    },
  ],
};

export { donationContent };
