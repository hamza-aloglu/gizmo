const GAService = {
    runGA: async (scheduleStartDate, scheduleEndDate, tasks, isDeadlineMustMeet, isParentTaskMustMeet, weightPriority,
    weightDifficulty, weightDeadline, weightParentTask, generationNumber, populationSize, mutationRate) => {
        const url = "http://localhost:8084/schedule"
        const body = {
            "scheduleStartDate": scheduleStartDate,
            "scheduleEndDate": scheduleEndDate,
            "tasks": tasks,
            "isDeadlineMustMeet": isDeadlineMustMeet,
            "isParentTaskMustMeet": isParentTaskMustMeet,

            "weightPriority": weightPriority,
            "weightDifficulty": weightDifficulty,
            "weightDeadline": weightDeadline,
            "weightParentTask": weightParentTask,
            
            "generationNumber": generationNumber,
            "populationSize": populationSize,
            "mutationRate": mutationRate
        }

        console.log(body);

        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }
}

export default GAService;