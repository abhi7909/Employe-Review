console.log('employee review script loaded');


const feedbackGiverList = document.getElementById('feedback-giver-list');
const deleteEmployeeBtn = document.getElementById('delete-employee-btn');

/**
 * event listner on list of employees who can give feedback 
 * if ask-feedback-btn get clicked we ask feedback to that employee
 * if cancel-feedback-btn clicked we cancel the asked feedback 
 */
feedbackGiverList.addEventListener('click', async (e) => {
    const target = e.target;

    if (target.classList.contains('ask-feedback-btn')) {
        const giverId = target.parentElement.dataset.id;
        const recieverId = feedbackGiverList.dataset.id;

        const response = await fetch('/user/ask-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ recieverId, giverId })
        })

        const result = await response.json();

        if (result.status == 'successful') {
            target.classList.remove('btn-success', 'ask-feedback-btn');
            target.classList.add('btn-secondary', 'cancel-feedback-btn');

            target.innerText = 'cancel';
        }


    } else if (target.classList.contains('cancel-feedback-btn')) {

        const giverId = target.parentElement.dataset.id;
        const recieverId = feedbackGiverList.dataset.id;

        const response = await fetch('/user/cancel-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ recieverId, giverId })
        })

        const result = await response.json();

        if (result.status == 'successful') {
            target.classList.add('btn-success', 'ask-feedback-btn');
            target.classList.remove('btn-secondary', 'cancel-feedback-btn');

            target.innerText = 'Ask';
        }

    }
})

/**
 * delete button event listener to delete user from db
 * we have used sweetalert to give alert to the user
 * when button get click we asked user to if he / she really want to delete employee (confirmation)
 * if user clicked on ok then we delete employee with AJAX and redirect user to admin panel
 * else we cancel the process of deletion
 */
deleteEmployeeBtn.addEventListener('click', async (e) => {
    swal({
        title: "Delete Employee!",
        text: "after deleting employee, its feedbacks and employee details will no longer available",
        icon: "warning",
        dangerMode: true,
        buttons: true
    }).then(async (value) => {
        if (value) {


            const response = await fetch('/user/employee', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'employeeId': deleteEmployeeBtn.dataset.id })
            })


            const result = await response.json();

            if (result.status == 'successful') {
                swal({
                    title: `${result.message}`,
                    icon: 'success'
                });

                window.location.href = '/user/admin';

            } else {
                swal({
                    title: `${result.message}`,
                    icon: 'error'
                })
            }
        }
    })
})