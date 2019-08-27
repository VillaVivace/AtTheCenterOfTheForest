function narrative(line) {
    switch(line) {
        case "stage1_1":
            return '*NEW JOUNRAL ENTRY* \n\"I\'ve been looking everywhere for this tower and I\'ve finally arrived. \nI can\'t believe I made it. Only time will tell what awaits me. \nI better keep my visit documented in this book.\" [Press SPACE to continue]';
        break;
        case "stairs1":
            return '*NEW JOUNRAL ENTRY* \n\"I am already regretting my decision to come here.\nJust have to push on...\" [Press SPACE to continue]';
        break;
        case "stairs2":
            return '*NEW JOUNRAL ENTRY* \n\"I don\'t want to be here anymore... I can\'t even fight back.\nAll I\'m doing is hiding. \nI mean, that\'s usually how it goes for me anyways.\"';
        break;
        case "L2_2":
            return 'Am I beautiful?\nYes [up]\nNo [down]';
        break;
       
        case "L2_1":
            return 'Don\'t tell her she is beautiful\nuntil she can see it for herself.';
        break;
    }
}
