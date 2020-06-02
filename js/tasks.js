window.ToDoList = {

    API_URL: 'http://localhost:8081/tasks',

    createTask: function () {
        let descriptionValue = $('#description-field').val();
        let deadlineValue = $('#deadline-field').val();

        var requestBody = {
            description: descriptionValue,
            deadline: deadlineValue
        };

        $.ajax({
            url: ToDoList.API_URL,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestBody)
        }).done(function (response) {
            console.log('success');
            console.log(response);
        });
    },

    bindEvents: function () {
        $('#create-task-form').submit(function () {
            ToDoList.createTask();
        });
    }

};

ToDoList.bindEvents();