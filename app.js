let quoteLists = {
    "Motivation": [
        { text: "The greatest of richness is the richness of the soul.", author: "Prophet Muhammad(PBUH)", category: "Inspiration" },
        { text: "No amount of guilt can change the past and no amount of worrying can change the future.", author: "Umar ibn Al-Khattab", category: "Life" },
        { text: "He who avoids complaint invites happiness.", author: "Abu Bakr", category: "Life" },
        { text: "You learn more from failure than from success. Don’t let it stop you. Failure builds character.", author: "Unknown", category: "Inspiration" },
        { text: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi", category: "Motivation" }
    ],
    "Humor": [
        { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein", category: "Humor" },
        { text: "You only live once, but if you do it right, once is enough.", author: "Mae West", category: "Humor" }
    ],
    "Wisdom": [
        { text: "It is the mark of an educated mind to be able to entertain a thought without accepting it.", author: "Aristotle", category: "Wisdom" },
        { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", category: "Wisdom" }
    ]
  };
  
  let currentList = 'Motivation';
  
  function createNewQuoteList() {
    const listName = prompt('Enter new list name:');
    if (listName && !quoteLists[listName]) {
        quoteLists[listName] = [];
        currentList = listName;
        updateListSelector();
        updateQuotesDisplay();
    }
  }
  
  function deleteCurrentQuoteList() {
    if (currentList && confirm(`Are you sure you want to delete the "${currentList}" list?`)) {
        delete quoteLists[currentList];
        currentList = Object.keys(quoteLists)[0] || '';
        updateListSelector();
        updateQuotesDisplay();
    }
  }
  
  function addQuote() {
    const text = document.getElementById('newQuoteText').value.trim();
    const author = document.getElementById('newQuoteAuthor').value.trim();
    const category = document.getElementById('newQuoteCategory').value;
    if (text && author) {
        quoteLists[category] = quoteLists[category] || [];
        quoteLists[category].push({ text, author, category });
        updateQuotesDisplay();
        clearInputFields();
    }
  }
  
  //Assisted by ChatGPT for guidance
  function displayRandomQuote() {
    const categories = Object.keys(quoteLists);
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);
    const randomCategory = categories[randomCategoryIndex];
    
    if (quoteLists[randomCategory] && quoteLists[randomCategory].length) {
        const randomIndex = Math.floor(Math.random() * quoteLists[randomCategory].length);
        const quote = quoteLists[randomCategory][randomIndex];
    
        document.getElementById('randomQuoteDisplay').innerText = `⭐ "${quote.text}" - ${quote.author} (${quote.category})`;
    } else {
        document.getElementById('randomQuoteDisplay').innerText = "No quotes available";
    }
  }
  
  function updateListSelector() {
    const selector = document.getElementById('quoteListSelector');
    selector.innerHTML = '';
    for (let listName in quoteLists) {
        const option = document.createElement('option');
        option.value = listName;
        option.textContent = listName;
        option.selected = listName === currentList;
        selector.appendChild(option);
    }
  }
  
  //Assisted by ChatGPT for guidance
  function updateQuotesDisplay() {
    const display = document.getElementById('quotesDisplay');
    display.innerHTML = '';
    if (quoteLists[currentList]) {
        quoteLists[currentList].forEach((quote, index) => {
            const div = document.createElement('div');
            div.textContent = `"${quote.text}" - ${quote.author}`;
            
            const updateBtn = document.createElement('button');
            updateBtn.textContent = 'Update';
            updateBtn.onclick = function() {
                startUpdateQuote(index);
            };
  
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = function() {
                deleteQuote(index);
            };
  
            div.appendChild(updateBtn);
            div.appendChild(deleteBtn);
            display.appendChild(div);
        });
    }
  }
  
  function clearInputFields() {
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteAuthor').value = '';
  }
  
  function changeCurrentList(selectedValue) {
    currentList = selectedValue;
    updateQuotesDisplay();
  }
  
  //Assisted by ChatGPT for guidance
  function updateQuote(index) {
    const text = document.getElementById('newQuoteText').value.trim();
    const author = document.getElementById('newQuoteAuthor').value.trim();
    const category = document.getElementById('newQuoteCategory').value;
  
    if (text && author) {
        const updatedQuote = { text, author, category };
        if (category !== currentList) {
            // If category has changed, move the quote to the new category
            quoteLists[currentList].splice(index, 1);
            quoteLists[category] = quoteLists[category] || [];
            quoteLists[category].push(updatedQuote);
        } else {
            // If category remains the same, just update the quote
            quoteLists[currentList][index] = updatedQuote;
        }
        updateQuotesDisplay();
        clearInputFields();
        document.getElementById('addUpdateBtn').textContent = 'Add Quote';
        document.getElementById('addUpdateBtn').onclick = addQuote;
    }
  }
  
  function startUpdateQuote(index) {
    const quote = quoteLists[currentList][index];
    document.getElementById('newQuoteText').value = quote.text;
    document.getElementById('newQuoteAuthor').value = quote.author;
    document.getElementById('newQuoteCategory').value = quote.category;
  
    document.getElementById('addUpdateBtn').textContent = 'Update Quote';
    document.getElementById('addUpdateBtn').onclick = function() {
        updateQuote(index);
    };
  }
  
  function deleteQuote(index) {
    if (index >= 0 && index < quoteLists[currentList].length) {
        quoteLists[currentList].splice(index, 1);
        updateQuotesDisplay();
    }
  }
  
  function saveToLocalStorage() {
    localStorage.setItem('quoteLists', JSON.stringify(quoteLists));
  }
  
  function loadFromLocalStorage() {
    console.log("Loading from local storage...");
    const savedQuoteLists = localStorage.getItem('quoteLists');
    if (savedQuoteLists) {
        quoteLists = JSON.parse(savedQuoteLists);
        // Update UI after loading
        updateListSelector();
        updateQuotesDisplay();
    }
  }
  
  // Initial setup
  updateListSelector();
  updateQuotesDisplay();
  