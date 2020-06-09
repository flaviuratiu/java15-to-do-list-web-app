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
        }).done(function () {
            ToDoList.getTasks();
        });
    },

    updateTask: function (id, done) {
        const requestBody = {
            done: done
        };

        $.ajax({
            url: ToDoList.API_URL + '?id=' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(requestBody)
        }).done(function () {
            ToDoList.getTasks();
        });
    },

    deleteTask: function (id) {
        $.ajax({
            url: ToDoList.API_URL + '?id=' + id,
            method: 'DELETE'
        }).done(function () {
            ToDoList.getTasks();
        });
    },

    getTasks: function () {
        $.ajax({
            url: ToDoList.API_URL
        }).done(function (response) {
            ToDoList.displayTasks(JSON.parse(response));
        });
    },

    displayTasks: function (tasks) {
        let rowsHtml = '';

        tasks.forEach(task => rowsHtml += ToDoList.getTaskRowHtml(task));

        $('#tasks-table tbody').html(rowsHtml);
    },

    getTaskRowHtml: function (task) {
        // spread syntax
        let formattedDeadline = new Date(...task.deadline).toLocaleDateString('ro');

        // ternary operator
        let checkedAttribute = task.done ? 'checked' : '';

        // same result as the ternary statement above
        // if (task.done) {
        //     checkedAttribute = 'checked';
        // } else {
        //     checkedAttribute = '';
        // }

        return `<tr>
                <td>${task.description}</td>
                <td>${formattedDeadline}</td>
                <td>
                    <input type="checkbox" class="mark-done" data-id=${task.id} ${checkedAttribute}>
                </td>
                <td>
                    <a href="#" class="remove-task" data-id=${task.id}>
                        <i class="fa fa-trash"></i>
                    </a>
                </td>
            </tr>`;
    },

    bindEvents: function () {
        $('#create-task-form').submit(function (event) {
            event.preventDefault();
            ToDoList.createTask();
        });

        // delegate is necessary because .mark-done element is dynamically injected in the page
        $('#tasks-table tbody').delegate('.mark-done', 'change', function (event) {
            event.preventDefault();

            let id = $(this).data('id');
            let checked = $(this).is(':checked');

            ToDoList.updateTask(id, checked);
        });

        $('#tasks-table tbody').delegate('.remove-task', 'click', function (event) {
            event.preventDefault();

            let id = $(this).data('id');

            ToDoList.deleteTask(id);
        });
    }

};

ToDoList.getTasks();
ToDoList.bindEvents();