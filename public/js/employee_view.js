console.log('employee view script loaded');


const feedbackForms = document.querySelectorAll('.feedback-form');
const warningDiv = document.getElementById('warning-by-server');



// add event listener to all pending feedback from 
for (let i = 0; i < feedbackForms.length; i++) {
    feedbackForms[i].addEventListener('submit', async function (e) {

        /**
         * get the form data and submit it using AJAX
         * if request is successful alert user with successful message and remove that form from DOM
         * else shows the error message given by server
         */

        warningDiv.innerHTML = '';

        e.preventDefault();
        const formData = new FormData(this);
        const data = JSON.stringify(Object.fromEntries(formData));

        this.reset();

        const response = await fetch('/user/submit-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });


        const result = await response.json();

        if (result.status == 'successful') {
            this.remove();
            warningDiv.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                ${result.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
        } else {
            warningDiv.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${result.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
        }

    })
}