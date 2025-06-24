const fs = require('fs');
const readline = require('readline');

// Path to your quotes.json file
const FILE_PATH = './quotes.json';

// Helper to get next date string in YYYY-MM-DD format
function getNextDate(latestDateStr) {
  const latestDate = new Date(latestDateStr);
  latestDate.setDate(latestDate.getDate() + 1);
  return latestDate.toISOString().split('T')[0];
}

// Format the quote string
function formatQuote(quote, person, work) {
  if (work) {
    return `“${quote}” — ${person}, ${work}`;
  } else {
    return `“${quote}” — ${person}`;
  }
}

// Main function
async function addQuote() {
  const quotes = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

  const quoteText = await ask('Enter the quote (without quotation marks): ');
  const person = await ask('Enter the person: ');
  const work = await ask('Enter the work (optional, press Enter to skip): ');

  const latestDate = quotes.reduce((max, q) => q.date > max ? q.date : max, quotes[0].date);
  const nextDate = getNextDate(latestDate);
  const formattedQuote = formatQuote(quoteText, person, work.trim() === '' ? null : work.trim());

  quotes.push({
    date: nextDate,
    quote: formattedQuote
  });

  fs.writeFileSync(FILE_PATH, JSON.stringify(quotes, null, 2));
  console.log('Quote added for date', nextDate);

  rl.close();
}

addQuote();
