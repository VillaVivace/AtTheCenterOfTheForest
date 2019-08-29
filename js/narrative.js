function narrative(line) {
    switch(line) {
        case "intro":
            return '*NEW JOURNAL ENTRY* \n\"I\'ve been looking everywhere for this tower and I\'ve finally arrived. \nI can\'t believe I made it. Only time will tell what awaits me. \nI better keep my visit documented in this book.\" \n[Press SPACE to continue]';
        break;
        case "stairs1":
            return '*NEW JOURNAL ENTRY* \n\"I am already regretting my decision to come here.\nJust have to push on...\" ';
        break;
        case "stairs2":
            return '*NEW JOURNAL ENTRY* \n\"I don\'t want to be here anymore... I can\'t even fight back.\nAll I\'m doing is hiding. \nI mean, that\'s usually how it goes for me anyways.\"';
        break;
        case "stairs3":
            return '*NEW JOURNAL ENTRY* \n\"Bottom Text\"';
        break;
        case "leftMonster1":
            return 'SKIPPED';
        break;
        case "leftMonster2":
            return 'No Legs: \"Don\'t tell her she is beautiful until she can see it for herself.\"';
        break;
        case "leftMonster3":
            return 'No Legs: \"I MEAN IT.\"';
        break;
        case "leftMonster4":
            return 'END';
        break;
        case "rightMonster1":
            return 'SKIPPED';
        break;
        case "rightMonster2":
            return 'Bloodroot: \"Do be honest... am I beautiful?\"\nSure. [1]\nNot at all. [2]\n(Say nothing) [Space]';
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
       
        
    }
}
