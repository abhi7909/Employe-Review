console.log('create company scipt loaded');

const formCreateCompany = document.getElementById("create-company-form");
const warningDiv = document.getElementById("warnings-by-server");

/**
 * create company form submit listner using AJAX
 * if request is successfull we show alert to login
 * else shows the error message given from server
 */

formCreateCompany.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(formCreateCompany);
    const data = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(data);

    const response = await fetch('/create-company', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })

    const result = await response.json();

    console.log(result);

    if (result.status == 'successful') {
        formCreateCompany.reset();
        warningDiv.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            user and associated company created successfully <br/>
            <a href="/signin" class="btn btn-primary my-3">SignIn Now</a>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    } else {
        warningDiv.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${result.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
    }


});