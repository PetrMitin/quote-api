const submitButton = document.getElementById('submit-quote');
const successMessageContainer = document.getElementById('success-message');

submitButton.addEventListener('click', () => {
  const id = document.getElementById('id').value;

  fetch(`/api/quotes/${id}`, {
    method: 'DELETE',
  })
  .then((response) => {
    const successMessage = document.createElement('div');
    if(response.status === 204) {
    successMessage.innerHTML = `
    <h3>Congrats, your quote was deleted!</h3>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    } else {
      successMessage.innerHTML = `
      <h3>No such quote! Doublecheck entered id!</h3>
    `
    }

    successMessageContainer.appendChild(successMessage);
  });
});
