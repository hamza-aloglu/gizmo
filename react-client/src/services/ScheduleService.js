import GeneticAlgorithmUrl from "../authorization/links/GeneticAlgorithmUrl";

const getHeaders = () => {
    const token = sessionStorage.getItem(process.env.REACT_APP_TOKEN);
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    headers.set("Authorization", "Bearer " + token);
    return headers;
};

const ScheduleService = {
    runGA: async (scheduleStartDate, scheduleEndDate, tasks, wPriority, wDifficulty, wDeadline, wParentTask,
        generationNumber, populationSize, mutationRate, elitismRate
    ) => {
        scheduleStartDate = scheduleStartDate + "T00:00:00Z";
        scheduleEndDate = scheduleEndDate + "T00:00:00Z";

        const body = {
            "scheduleStartDate": scheduleStartDate,
            "scheduleEndDate": scheduleEndDate,
            "tasks": tasks,
            "isDeadlineMustMeet": false,
            "isParentTaskMustMeet": false,
            "weightPriority": wPriority,
            "weightDifficulty": wDifficulty,
            "weightDeadline": wDeadline,
            "weightParentTask": wParentTask,
            "generationNumber": generationNumber,
            "populationSize": populationSize,
            "mutationRate": mutationRate,
            "elitismRate": elitismRate,
        }

        console.log(body);

        const url = GeneticAlgorithmUrl() + "/schedule";
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
    }
}

export default ScheduleService;