// Funkce na ziskani zkratky dne v ceskem jazyce
function getCzechDayAbbreviation(date) {
    const days = ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'];
    return days[date.getDay()];
}

// Funkce na ziskani datumů z textu a jejich nahrazeni
function replaceDatesInText(text) {
    // RegEx pro format d.m.
    const datePattern = /(\d{1,2})\. (\d{1,2})\./g;
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);
    const twoWeekAgo = new Date();
    twoWeekAgo.setDate(now.getDate() - 14);

    return text.replace(datePattern, (match, day, month) => {
        const date = new Date(now.getFullYear(), parseInt(month) - 1, parseInt(day)); // Nastavíme rok aktuální

        // Pokud datum neexistuje (např. 30.2.), vrátíme původní text
        if (date.getDate() !== parseInt(day) || date.getMonth() !== parseInt(month) - 1) {
            return match;
        }

        const dayAbbreviation = getCzechDayAbbreviation(date);

        // Kontrola, zda je datum v poslednim tydnu nebo dvou týdnech
        if (date >= weekAgo && date <= now) {
            return `${dayAbbreviation} ${match}`;
        } else if (date >= twoWeekAgo && date < weekAgo) {
            return `> ${dayAbbreviation} ${match}`;
        }

        return `>> ${dayAbbreviation} ${match}`;
    });
}

// Funkce na prohledani cele stranky a nahrazeni datumů
function replaceOnPage() {
    const elements = document.body.getElementsByTagName('*');
    for (let element of elements) {
        for (let node of element.childNodes) {
            if (node.nodeType === 3) { // Textový uzel
                const newText = replaceDatesInText(node.nodeValue);
                if (newText !== node.nodeValue) {
                    node.nodeValue = newText;
                }
            }
        }
    }
}

// Spusteni funkce po nacteni stranky
window.onload = replaceOnPage;
