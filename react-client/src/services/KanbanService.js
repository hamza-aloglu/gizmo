import resourceUrl from "../authorization/links/resourceUrl";

const token = sessionStorage.getItem(process.env.REACT_APP_TOKEN);
const headers = new Headers();
headers.set("Content-Type", "application/json");
headers.set("Accept", "application/json");
headers.set("Authorization", "Bearer " + token);

const KanbanService = {
    fetchBoards: async () => {
        const url = resourceUrl() + "/board";
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers,
        });
    },

    createBoard: async (title) => {
        const body = {
            "title": title
        }

        const url = resourceUrl() + "/board"
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers,
            body: JSON.stringify(body),
        });
    },

    getBoard: async (boardId) => {
        const url = resourceUrl() + "/board" + `/${boardId}`;
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers,
        });
    },

    createColumn: async (title, boardId) => {
        const body = {
            "title": title,
            "boardId": boardId,
        }

        const url = resourceUrl() + "/column";
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers,
            body: JSON.stringify(body),
        });
    },

    createCard: async (title, columnId) => {
        const body = {
            "title": title,
            "kanbanColumnId": columnId,
        }

        const url = resourceUrl() + "/cards";
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers,
            body: JSON.stringify(body),
        });
    },

    createNote: async (title, cardId) => {
        const body = {
            "title": title,
            "cardId": cardId,
        }

        const url = resourceUrl() + "/note";
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers,
            body: JSON.stringify(body),
        });
    }
}

export default KanbanService;