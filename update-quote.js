const submitButton = document.getElementById('submit-quote');
const newQuoteContainer = document.getElementById('updated-quote');

submitButton.addEventListener('click', () => {
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;
  const id = document.getElementById('id').value;

  fetch(`/api/quotes/${id}?quote=${quote}&person=${person}`, {
    method: 'PUT',
  })
  .then(response => {
    if(response.ok) {
    response.json();
  } else {
    return {quotes: {}}
  }})
  .then(({quote}) => {
    const newQuote = document.createElement('div');
    if (quote) {
    newQuote.innerHTML = `
    <h3>Congrats, your quote was updated!</h3>
    <div class="quote-text">${quote.quote}</div>
    <div class="attribution">- ${quote.person}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    } else {
      newQuote.innerHTML = `
    <h3>No such quote! Doublecheck entered id!</h3>
    `
    }

    newQuoteContainer.appendChild(newQuote);
  });
});
