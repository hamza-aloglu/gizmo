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

    createTimeline: async (timelineTitle) => {
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

    deleteTimelineElement: async (timelineElementId) => {
        const url = resourceUrl() + `/timelineelements?id=${timelineElementId}`;
        return fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            headers: getHeaders(),
        })
    },

    deleteTimeline: async (timelineId) => {
        const url = resourceUrl() + `/timelines?timelineId=${timelineId}`;
        return fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            headers: getHeaders(),
        });
    },

    // <timeline element updates>
    updateTitle: async (teId, teTitle) => {
        const url = resourceUrl() + `/timelineelements/title?id=${teId}&title=${teTitle}`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
        });
    },

    updateSubtitle: async (teId, teSubtitle) => {
        const url = resourceUrl() + `/timelineelements/subtitle?id=${teId}&subtitle=${teSubtitle}`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
        });
    },

    updateDate: async (teId, teDate) => {
        const url = resourceUrl() + `/timelineelements/date?id=${teId}&date=${teDate}`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
        });
    },

    updateDesc: async (teId, teDesc) => {
        const url = resourceUrl() + `/timelineelements/desc?id=${teId}&desc=${teDesc}`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
        });
    },

    updateBoard: async (teId, boardId) => {
        const url = resourceUrl() + `/timelineelements/board?id=${teId}&boardId=${boardId}`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
        });
    },
    // </timeline element updates>
}

export default TimelineService;