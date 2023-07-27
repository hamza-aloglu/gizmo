import resourceUrl from "../authorization/links/resourceUrl";

const token = sessionStorage.getItem(process.env.REACT_APP_TOKEN);
const headers = new Headers();
headers.set("Content-Type", "application/json");
headers.set("Accept", "application/json");
headers.set("Authorization", "Bearer " + token);

const KanbanService = {
    fetchBoards: async () => {
        const url = resourceUrl() + "/boards";
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

        const url = resourceUrl() + "/boards"
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers,
            body: JSON.stringify(body),
        });
    },

    getBoard: async (boardId) => {
        const url = resourceUrl() + "/boards" + `/${boardId}`;
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

        const url = resourceUrl() + "/columns";
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

        const url = resourceUrl() + "/notes";
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers,
            body: JSON.stringify(body),
        });
    },

    getColumns: async (boardId) => {
        const url = resourceUrl() + `/columns?boardId=${boardId}`;
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers,
        });
    },

    getCardsByBoard: async (boardId) => {
        const url = resourceUrl() + `/cards/${boardId}`;
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers,
        })
    },

    updateBoardTitle: async (boardTitle, boardId) => { 
        const url = resourceUrl() + `/boards/title?title=${boardTitle}&boardId=${boardId}`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers,
        });
    },

    updateColumnTitle: async (columnTitle, columnId) => { 
        const url = resourceUrl() + `/columns/title?title=${columnTitle}&id=${columnId}`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers,
        });
    },
}

export default KanbanService;