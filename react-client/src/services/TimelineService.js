import resourceUrl from "../authorization/links/resourceUrl";

const getHeaders = () => {
    const token = sessionStorage.getItem(process.env.REACT_APP_TOKEN);
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    headers.set("Authorization", "Bearer " + token);
    return headers;
};

const TimelineService = {
    createTimelineElement: async (formData) => {
        const url = resourceUrl() + "/timelineelements";
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: getHeaders(),
            body: JSON.stringify(formData),
        });
    },
}

export default TimelineService;