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

    getTimeline: async (timelineId) => {
        const url = resourceUrl() + `/timelines/${timelineId}`;
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: getHeaders(),
        })
    },

    createTimeline: async(timelineTitle) => {
        const body = {
            "title": timelineTitle,
        };

        const url = resourceUrl() + '/timelines';
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: getHeaders(),
            body: JSON.stringify(body),
        })
    },
}

export default TimelineService;