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
        const date = new Date();
        date.setDate(parseInt(day));
        date.setMonth(parseInt(month) - 1); // Měsíce jsou indexované od 0

				const dayAbbreviation = getCzechDayAbbreviation(date);
        // Kontrola, zda je datum v poslednim tydnu
        if (date >= weekAgo && date <= now) {
            return `${dayAbbreviation} ${match}`;
        } else if (date >= twoWeekAgo && date <= now) {
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

