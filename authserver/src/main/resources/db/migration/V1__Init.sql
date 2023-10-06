CREATE SEQUENCE IF NOT EXISTS board_seq START WITH 1 INCREMENT BY 50;

CREATE SEQUENCE IF NOT EXISTS card_seq START WITH 1 INCREMENT BY 50;

CREATE SEQUENCE IF NOT EXISTS kanban_column_seq START WITH 1 INCREMENT BY 50;

CREATE SEQUENCE IF NOT EXISTS note_seq START WITH 1 INCREMENT BY 50;

CREATE SEQUENCE IF NOT EXISTS timeline_element_seq START WITH 1 INCREMENT BY 50;

CREATE SEQUENCE IF NOT EXISTS timeline_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE board
(
    id       BIGINT       NOT NULL,
    title    VARCHAR(255),
    username VARCHAR(255) NOT NULL,
    CONSTRAINT pk_board PRIMARY KEY (id)
);

CREATE TABLE card
(
    id               BIGINT  NOT NULL,
    title            VARCHAR(255),
    kanban_column_id BIGINT,
    index            INTEGER NOT NULL,
    CONSTRAINT pk_card PRIMARY KEY (id)
);

CREATE TABLE kanban_column
(
    id       BIGINT NOT NULL,
    title    VARCHAR(255),
    board_id BIGINT,
    CONSTRAINT pk_kanbancolumn PRIMARY KEY (id)
);

CREATE TABLE note
(
    id      BIGINT NOT NULL,
    title   VARCHAR(255),
    content VARCHAR(10485760),
    card_id BIGINT,
    CONSTRAINT pk_note PRIMARY KEY (id)
);

CREATE TABLE timeline
(
    id       BIGINT       NOT NULL,
    title    VARCHAR(255),
    username VARCHAR(255) NOT NULL,
    CONSTRAINT pk_timeline PRIMARY KEY (id)
);

CREATE TABLE timeline_element
(
    id          BIGINT NOT NULL,
    title       VARCHAR(255),
    subtitle    VARCHAR(255),
    date        TIMESTAMP WITHOUT TIME ZONE,
    description VARCHAR(10485760),
    timeline_id BIGINT,
    board_id    BIGINT,
    created_at  TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_timelineelement PRIMARY KEY (id)
);

ALTER TABLE card
    ADD CONSTRAINT FK_CARD_ON_KANBANCOLUMN FOREIGN KEY (kanban_column_id) REFERENCES kanban_column (id);

ALTER TABLE kanban_column
    ADD CONSTRAINT FK_KANBANCOLUMN_ON_BOARD FOREIGN KEY (board_id) REFERENCES board (id);

ALTER TABLE note
    ADD CONSTRAINT FK_NOTE_ON_CARD FOREIGN KEY (card_id) REFERENCES card (id);

ALTER TABLE timeline_element
    ADD CONSTRAINT FK_TIMELINEELEMENT_ON_BOARD FOREIGN KEY (board_id) REFERENCES board (id);

ALTER TABLE timeline_element
    ADD CONSTRAINT FK_TIMELINEELEMENT_ON_TIMELINE FOREIGN KEY (timeline_id) REFERENCES timeline (id);


CREATE SEQUENCE IF NOT EXISTS users_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE users
(
    id       BIGINT NOT NULL,
    username VARCHAR(255),
    password VARCHAR(255),
    roles    VARCHAR(255),
    CONSTRAINT pk_users PRIMARY KEY (id)
);

ALTER TABLE users
    ADD CONSTRAINT uc_users_username UNIQUE (username);