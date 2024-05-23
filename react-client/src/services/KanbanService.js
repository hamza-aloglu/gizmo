import resourceUrl from "../authorization/links/resourceUrl";

const getHeaders = () => {
    const token = sessionStorage.getItem(process.env.REACT_APP_TOKEN);
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    headers.set("Authorization", "Bearer " + token);
    return headers;
};

const KanbanService = {
    fetchBoards: async () => {
        const url = resourceUrl() + "/boards";
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: getHeaders(),
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
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
    },

    getBoard: async (boardId) => {
        const url = resourceUrl() + "/boards" + `/${boardId}`;
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: getHeaders(),
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
            headers: getHeaders(),
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
            headers: getHeaders(),
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
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
    },

    getColumns: async (boardId) => {
        const url = resourceUrl() + `/columns?boardId=${boardId}`;
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: getHeaders(),
        });
    },

    getCardsByBoard: async (boardId) => {
        const url = resourceUrl() + `/cards/${boardId}`;
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: getHeaders(),
        })
    },

    updateBoardTitle: async (boardTitle, boardId) => {
        const url = resourceUrl() + `/boards/title?title=${boardTitle}&boardId=${boardId}`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
        });
    },

    updateColumnTitle: async (columnTitle, columnId) => {
        const url = resourceUrl() + `/columns/title?title=${columnTitle}&id=${columnId}`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
        });
    },

    updateCardTitle: async (cardTitle, cardId) => {
        const url = resourceUrl() + `/cards/title?title=${cardTitle}&cardId=${cardId}`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
        });
    },

    updateNoteContent: async (noteContent, noteId) => {
        const body = {
            "id": noteId,
            "content": noteContent,
        };

        const url = resourceUrl() + `/notes/content`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
    },

    updateColumnOfCard: async (sourceColumnId, targetColumnId, cardId) => {
        const body = {
            "sourceColumnId": sourceColumnId,
            "targetColumnId": targetColumnId,
            "cardId": cardId,
        }

        const url = resourceUrl() + `/cards/column`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
    },

    updateCardIndexes: async (cards) => {
        const cardIndexUpdateRequestList = [];
        cards.forEach((card, i) => cardIndexUpdateRequestList.push({ "cardId": card.id, "index": i }));

        const body = {
            cardIndexUpdateRequestList,
        }

        const url = resourceUrl() + `/cards`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
            body: JSON.stringify(body),
        })
    },

    updateColumnOfCard: async (cardId, columnId) => {
        const body = {
            "targetColumnId": columnId,
            "cardId": cardId,
        }

        const url = resourceUrl() + `/cards/column`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
    },

    deleteColumn: async (columnId) => {
        const url = resourceUrl() + `/columns?id=${columnId}`;
        return fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            headers: getHeaders(),
        })
    },

    deleteCard: async (cardId) => {
        const url = resourceUrl() + `/cards?id=${cardId}`;
        return fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            headers: getHeaders(),
        })
    },

    deleteNote: async (noteId) => {
        const url = resourceUrl() + `/notes?id=${noteId}`;
        return fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            headers: getHeaders(),
        })
    },

    getNotes: async (cardId) => {
        const url = resourceUrl() + `/notes?cardId=${cardId}`;
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: getHeaders(),
        });
    },

    updateNoteTitle: async (noteId, title) => {
        const url = resourceUrl() + `/notes/title?title=${title}&noteId=${noteId}`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
        });
    },

    updateColumnOfCardScheduled: async (cardId, columnId, scheduleTime) => {
        const body = {
            "targetColumnId": columnId,
            "cardId": cardId,
        }

        const url = resourceUrl() + `/cards/column/schedule?date=${scheduleTime}`;
        return fetch(url, {
            method: 'PUT',
            mode: "cors",
            headers: getHeaders(),
            body: JSON.stringify(body)
        });
    },

    unsetColumnOfCardScheduled: async (cardId) => {
        const url = resourceUrl() + `/cards/column/schedule/unset?cardId=${cardId}`;
        return fetch(url, {
            method: 'PUT',
            mode: "cors",
            headers: getHeaders(),
        });
    },

    deleteBoard: async (boardId) => {
        console.log(boardId);
        const url = resourceUrl() + `/boards?boardId=${boardId}`;
        return fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            headers: getHeaders(),
        })
    },

    updateCardDifficulty: async (difficulty, cardId) => {
        const url = resourceUrl() + `/cards/difficulty?difficulty=${difficulty}&cardId=${cardId}`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
        });
    },

    updateCardPriority: async (priority, cardId) => {
        const url = resourceUrl() + `/cards/priority?priority=${priority}&cardId=${cardId}`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
        });
    },

    updateCardDeadline: async (deadline, cardId) => {
        const url = resourceUrl() + `/cards/deadline?deadline=${encodeURIComponent(deadline)}&cardId=${cardId}`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
        });
    },

    updateParentTask: async (parentTaskId, cardId) => {
        const url = resourceUrl() + `/cards/parentTask?parentCardId=${parentTaskId}&cardId=${cardId}`;
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: getHeaders(),
        });
    }
}

export default KanbanService;