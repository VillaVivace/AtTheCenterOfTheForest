function narrative(line) {
    switch(line) {
        /* --Journal Entries-- */
            case "intro":
                return '*NEW JOURNAL ENTRY* \n\"Holy crap, the tower up ahead is huge!!\nI can\'t believe I finally made it <3. Only time will tell what awaits me. \nThis is just the beginning of a fascinating journey.\" \n[Press SPACE to continue]';
            break;
            case "stairs1":
                return '*NEW JOURNAL ENTRY* \n\"Okay... first of all, WHAT THE HELL WAS THAT THING!?\nIt was a lrge, fleshy, bloody, slug-looking thing!\nI am already regretting my decision to come here.\nI just have to push on... Plus, I don\'t wanna go back to that creature.\" ';
            break;
            case "stairs2":
                return '*NEW JOURNAL ENTRY* \n\"I don\'t want to be here anymore... My body is refusing to fight back.\nAll I\'m doing is hiding. \nI mean, I guess that\'s what I usually do anyways.\nMaybe I should try a new approach...\"';
            break;
            case "stairs3":
                return '*NEW JOURNAL ENTRY* \n\"Huh, I faced my problems head-on this time, instead of running and hiding.\nThat felt good, even though it was horrific as all hell.\nI wonder what\'s up ahead.\"';
            break;
        /* --Level 2 Monster Dialogue-- */
        /* --No Legs-- */
            case "leftMonster":
                return 'SKIPPED';
            break;
            case "leftMonster1":
                return 'No Legs: \"Ugghh... All Bloodroot does is talk about their beauty.\nI just nod or stay silent until they stop.\"';
            break;
            case "leftMonster2":
                return 'No Legs: \"A little word of advice- \nDon\'t comment on Bloodroot\'s beauty until they can see it for themself.\"';
            break;
            case "leftMonster3":
                return 'No Legs: \"Trust me. \nYou do not want to get on their bad side!\"';
            break;
            case "leftMonster4":
                return 'No Legs: \"I \' M  S E R I O U S !\"';
            break;
            case "leftMonster5":
                return 'END';
            break;
            case "leftMonster6":
                return 'SKIPPED';
            break;
            case "leftMonster7":
                return 'No Legs: \"Hey! You got them to stop talking!\n[SIGHS]...for now...\"';
            break;
            case "leftMonster8":
                return 'No Legs: \"Anyways, here\'s something for all your troubles.\nThanks again.\"';
            break;
            case "leftMonster9":
                return 'You were given the key to the kitchen!\n\n[Key added to your inventory]';
            break;
            case "leftMonster10":
                return 'END';
            break;
            /* --Bloodroot-- */
            case "rightMonster1":
                return 'SKIPPED';
            break;
            case "rightMonster2":
                return 'Bloodroot: \"Do be honest... am I beautiful? I need to know.\"\nSure. [1]\nNot at all. [2]\n(Say nothing) [Space]';
            break;
            case "rightMonsterChoice1":
                    return 'Bloodroot: \"Sure? That\'s it!?\nYour indifference irritates me!!\"';
            break;
            case "rightMonsterChoice2":
                    return 'Bloodroot: [GASPS]\"How Rude!\nOh, what do you know about beauty!?\"';
            break;
            case "rightMonster3":
                return 'Bloodroot: \"HMPH! Don\'t say anything then. \nIt\'s not like I wanted your garbage opinion anyways.\"';
            break;
            case "rightMonster4":
                return 'END';
            break;
            case "rightMonster5":
                return 'SKIPPED';
            break;
            case "rightMonster6":
                return 'Bloodroot: \"Do be honest... am I beautiful? I need to know.\"\nTake a look for yourself. [1]\nNot at all. [2]\n(Say nothing) [Space]';
            break;
            case "rightMonsterChoice3":
                    return 'Bloodroot gazes into the mirror.\nBloodroot: \"Wow, I AM beautiful! No one can tell me otherwise.\nI just have to believe it with all my heart.\"';
            break;
            case "rightMonster7":
                return 'Bloodroot: \"HMPH! Don\'t say anything then. \nIt\'s not like I wanted your garbage opinion anyways.\"';
            break;
            case "rightMonster8":
                return 'END';
            break;
        /* --Chef Arma-- */
            case "kitchenMonster1":
                return 'SKIPPED';
            break;
            case "kitchenMonster2":
                return 'Chef Arma: \"Hey there! M\' name is Chef Arma.\nYou can probably guess why\"';
            break;
            case "kitchenMonster3":
                return 'Chef Arma: \"I know we just met, but do you think you could grab me an ingredient from the pantry?\nIt\'s the door to the right.\n\nThank You!\"';
            break;
            case "kitchenMonster4":
                return 'END';
            break;
            case "kitchenMonster5":
                return 'SKIPPED';
            break;
            case "kitchenMonster6":
                    return 'Chef Arma examines the specimen you just handed him.\nHe stares deeply at it... so much so that he starts sweating intensely.';
            break;
            case "kitchenMonster7":
                return 'Chef Arma: \"[SCREECH] THIS IS PERFECT!\n\nI will turn this into something amazing!\nThank you!\"';
            break;
            case "kitchenMonster8":
                return 'One of Chef Arma\'s arms tosses a key into the air.\nYou catch the key!\n\n[Exit Key added to inventory]';
            break;
            case "kitchenMonster9":
                return 'END';
            break;
        
       /* --Level Sub 1 Bookcase Interactions-- */
            case "bookcase1_1":
                return 'SKIPPED';
            break;
            case "bookcase1_2":
                return 'You look at the bookcase.';
            break;
            case "bookcase1_3":
                return 'You notice a book titled \"Beauty 101\".\n\nYou open it up to a bookmarked page.';
            break;
            case "bookcase1_4":
                return 'You read a highlighted quote aloud.\n\n\"Beauty is in the eye of the beholder.\"';
            break;
            case "bookcase1_5":
                    return 'How cliche.';
                break;
            case "bookcase1_6":
                return 'END';
            break;
            case "bookcase2_1":
                return 'SKIPPED';
            break;
            case "bookcase2_2":
                return 'You look at the bookcase.';
            break;
            case "bookcase2_3":
                return 'Lodged in-between some books is a hand mirror.';
            break;
            case "bookcase2_4":
                return 'Do you take the mirror?\nGrab the mirror [1]\nLeave it alone [2]';
            break;
            case "bookcase2_4Choice1":
                return 'You took the mirror.\n[Mirror added to inventory]';
            break;
            case "bookcase2_5":
                    return 'You leave the mirror and move on.';
                break;
            case "bookcase2_6":
                return 'END';
            break;
            case "bookcase3_1":
                return 'SKIPPED';
            break;
            case "bookcase3_2":
                return 'You look at the bookcase.';
            break;
            case "bookcase3_3":
                return 'Your eyes shift around searching for something interesting.\n\nYou notice a book titled \"How to Cope with Social Anxiety\"';
            break;
            case "bookcase3_4":
                return 'You reach for the book, but it vanishes before you get to it.';
            break;
            case "bookcase3_5":
                    return 'Looks like you don\'t have access to that information here...';
                break;
            case "bookcase3_6":
                return 'END';
            break;
        /* --Level Sub 2 Shelf/Crates Interactions-- */
            case "shelf1_1":
                return 'SKIPPED';
            break;
            case "shelf1_2":
                return 'You look at the cabinet.';
            break;
            case "shelf1_3":
                return 'You rummage through some items and then eventually lock eyes with a jar of... eyes.';
            break;
            case "shelf1_4":
                return 'Do you take the jar of eyeballs?\n(Keep in mind, you can only take one item out of this room)\nTake the jar [1]\nLeave it there [2]';
            break;
            case "shelf1_4Choice1":
                return 'You took the eyeballs.\n[Jar of Eyeballs added to inventory]'
            break;
            case "shelf1_5":
                return 'You leave the jar and move on.';
            break;
            case "shelf1_6":
                return 'END';
            break;
            case "shelf2_1":
                return 'SKIPPED';
            break;
            case "shelf2_2":
                return 'You look at the cabinet.';
            break;
            case "shelf2_3":
                return 'On one of the shelves, there\'s a mandrake just laying there.\nIt\'s lifeless. What a relief.';
            break;
            case "shelf2_4":
                return 'Do you take the mandrake?\n(Keep in mind, you can only take one item out of this room)\nTake the mandrake [1]\nLeave it there [2]';
            break;
            case "shelf2_4Choice1":
                return 'You took the mandrake.\n[Mandrake added to inventory]'
            break;
            case "shelf2_5":
                return 'You leave the dead mandrake there and move on.';
            break;
            case "shelf2_6":
                return 'END';
            break;
            case "crates1_1":
                return 'SKIPPED';
            break;
            case "crates1_2":
                return 'You examine the crates.';
            break;
            case "crates1_3":
                return 'You blindly dig around in one of the boxes, hoping for the best.\nYou grab ahold of something.\nIt\'s fleshy... and still beating.';
            break;
            case "crates1_4":
                return 'Do you take the heart?\n(Keep in mind, you can only take one item out of this room)\nTake the beating heart [1]\nLeave it there [2]';
            break;
            case "crates1_4Choice1":
                return 'You took the heart.\n[Heart added to inventory]'
            break;
            case "crates1_5":
                return 'You drop the beating heart and move on.';
            break;
            case "crates1_6":
                return 'END';
            break;
    }
}
