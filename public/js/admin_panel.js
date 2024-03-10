console.log('admin panel script loaded');

const employeeList = document.getElementById('employee-list');
const serverWarning = document.getElementById('warning-by-server');

/**
 * add event lister to the employee list and then we takes action according to targates (event delegation)
 * if make-admin-btn get clicked then create perticular employee to admin by using AJAX
 * if make-employee-btn clicked we demote user from admin to employee
 * if employee-list-item get clicked then we render employee review page
 */
employeeList.addEventListener('click', async (e) => {
    let target = e.target;

    if (target.classList.contains('make-admin-btn')) {

        const employeeId = target.parentElement.getAttribute('id');

        const response = await fetch('/user/make-admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ employeeId })
        });

        const result = await response.json();

        if (result.status == 'successful') {

            target.classList.remove('make-admin-btn');
            target.classList.remove('btn-primary');

            target.classList.add('make-employee-btn');
            target.classList.add('btn-secondary');

            target.innerText = 'make Employee'
        } else {
            serverWarning.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${result.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`
        }

    } else if (target.classList.contains('make-employee-btn')) {

        const employeeId = target.parentElement.getAttribute('id');

        const response = await fetch('/user/make-employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ employeeId })
        });

        const result = await response.json();

        if (result.status == 'successful') {

            target.classList.remove('make-employee-btn');
            target.classList.remove('btn-secondary');

            target.classList.add('make-admin-btn');
            target.classList.add('btn-primary');


            target.innerText = 'make Admin'
        } else {
            serverWarning.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${result.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`
        }


    } else if (target.classList.contains('employee-list-item')) {

        const employeeId = target.getAttribute('id');
        console.log('employee-list-item', employeeId);


        window.location.href = `/user/employee-review/${employeeId}`;

    }
})