import resourceUrl from "../authorization/links/resourceUrl";

const KanbanService = {
    fetchBoards: async() => {
        const token = sessionStorage.getItem(process.env.REACT_APP_TOKEN);
        const headers = new Headers();
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");
        headers.set("Authorization", "Bearer " + token);

        const url = resourceUrl() + "/board";
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers,
        });
    }
}

export default KanbanService;