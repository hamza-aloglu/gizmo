import React from 'react';
import Header from "../Header";
import { useEffect, useState } from "react";
import Schedule from "./Schedule";
import AuthService from '../../services/AuthService';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../css/schedule/SchedulePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import KanbanService from '../../services/KanbanService';
import ScheduleService from '../../services/ScheduleService';
import exampleDataset from './example-dataset.json';
import exampleDataset2 from './example-dataset2.json';
import { useLocation } from 'react-router';

const SchedulePage = () => {
    const [selectedBoard, setSelectedBoard] = useState('');
    const [showSidebar, setShowSidebar] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [population, setPopulation] = useState(2000);
    const [generation, setGeneration] = useState(10);
    const [mutationRate, setMutationRate] = useState(0.35);
    const [elitism, setElitism] = useState(0.07);
    const [isWeightsOpen, setIsWeightsOpen] = useState(false);
    const [boards, setBoards] = useState([]);
    const [priorityWeight, setPriorityWeight] = useState(5);
    const [difficultyWeight, setDifficultyWeight] = useState(4);
    const [deadlineWeight, setDeadlineWeight] = useState(7);
    const [parentTaskWeight, setParentTaskWeight] = useState(7);
    const [days, setDays] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let currentDate = new Date();
    const [startDate, setStartDate] = useState(currentDate.toISOString().split('T')[0]);

    currentDate.setDate(currentDate.getDate() + 7);
    const [endDate, setEndDate] = useState(currentDate.toISOString().split('T')[0]);
    const bgImage = `${process.env.PUBLIC_URL}/pexels-eberhardgross-1287145.jpg`;

    useEffect(() => {
        KanbanService.fetchBoards().then(async (response) => {
            const responseBoards = await response.json();
            setBoards(responseBoards);
        })
    }, []);

    const renderSchedule = () => {
        return (
            <Schedule setShowSidebar={setShowSidebar}
                showSidebar={showSidebar}
                setIsHovered={setIsHovered}
                days={days}
                scheduleStartDate={startDate} />
        )
    }

    const startGeneticAlgorithm = async () => {
        setIsLoading(true);
        if (!selectedBoard) {
            alert('Please select a board');
            return;
        }

        if (!startDate || !endDate) {
            alert('Please provide both start and end dates');
            return;
        }

        if (endDate <= startDate) {
            alert('End date should be larger than start date');
            return;
        }

        let cards;

        if (selectedBoard === 'example-dataset') {
            cards = exampleDataset.tasks;
        } else {
            cards = await KanbanService.getCardsByBoard(selectedBoard).then(async (response) => {
                const responseCards = await response.json();
                return responseCards;
            });
        }

        ScheduleService.runGA(startDate, endDate, cards, priorityWeight, difficultyWeight, deadlineWeight, parentTaskWeight, generation, population, mutationRate, elitism)
            .then(async (response) => {
                const responseSchedule = await response.json();
                console.log(responseSchedule.days);
                setDays(responseSchedule.days);
                setIsLoading(false);
            });
    }

    return (
        <div style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', zIndex: 999, cursor: isLoading ? 'wait' : 'default' }}>
            <Header />
            <div className={`sidebar ${showSidebar ? 'open' : ""}`}
                style={{ width: showSidebar ? 'var(--sidebar-width)' : '', gap: '25px', backgroundColor: 'rgba(245, 245, 245, 0.8)' }}>
                <div id="username-section">
                    <div>
                        <span> Workspace </span>
                        <h4>{AuthService.generateUsername()} </h4>
                    </div>

                    <button className="sidebar-toggle-btn"
                        onClick={() => setShowSidebar(!showSidebar)}
                        title="toggle sidebar"
                    >
                        <span className="arrow-icon-left"></span>
                    </button>
                </div>

                <div className='date-section'>
                    <input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <div className='icon-arrow-right'>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                    <input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>

                <div className='select-container'>
                    <div className="up_note">
                        <p>Select board to schedule</p>
                    </div>
                    <div className="select">
                        <select onChange={(e) => setSelectedBoard(e.target.value)} defaultValue={selectedBoard}>
                            <option value='' disabled>Select Board</option>
                            {boards.map((board) => (
                                <option key={board.id} value={board.id}>
                                    {board.title}
                                </option>
                            ))}
                            <option value='example-dataset' >
                                {`Example Dataset`}
                            </option>
                        </select>
                    </div>

                </div>


                <div className='ga-parameters'>
                    <div className='ga-slider'>
                        <label>Population</label>
                        <div className='slider-wrapper'>
                            <span>{population}</span>
                            <Slider min={0} max={10000} onChange={val => setPopulation(val)} step={100} defaultValue={population} />
                        </div>
                    </div>
                    <div className='ga-slider'>
                        <label>Generation</label>
                        <div className='slider-wrapper'>
                            <span>{generation}</span>
                            <Slider min={0} max={100} onChange={val => setGeneration(val)} defaultValue={generation} />
                        </div>
                    </div>
                    <div className='ga-slider'>
                        <label>Mutation</label>
                        <div className='slider-wrapper'>
                            <span>{mutationRate}</span>
                            <Slider min={0} max={1} step={0.01} onChange={val => setMutationRate(val)} defaultValue={mutationRate} />
                        </div>
                    </div>
                    <div className='ga-slider'>
                        <label>Elitism</label>
                        <div className='slider-wrapper'>
                            <span>{elitism}</span>
                            <Slider min={0} max={1} step={0.01} onChange={val => setElitism(val)} defaultValue={elitism} />
                        </div>
                    </div>
                    <div className='ga-weights'>
                        <label className='weight-label' onClick={() => setIsWeightsOpen(!isWeightsOpen)}>
                            Weights
                            <div className='arrow-down-wrapper'>
                                <FontAwesomeIcon icon={faArrowDown} />
                            </div>
                        </label>
                        <div className={`weights-wrapper ${isWeightsOpen ? 'visible' : ''}`}>
                            <div className='weight'>
                                <span>Priority</span>
                                <input
                                    type='number'
                                    value={priorityWeight}
                                    min={0}
                                    max={10}
                                    onChange={e => {
                                        if (e.target.value > 10) {
                                            setPriorityWeight(10);
                                        } else if (e.target.value < 0) {
                                            setPriorityWeight(0);
                                        }
                                        else {
                                            setPriorityWeight(parseInt(e.target.value, 10));
                                        }
                                    }}
                                />
                            </div>
                            <div className='weight'>
                                <span>Difficulty</span>
                                <input
                                    type='number'
                                    value={difficultyWeight}
                                    min={0}
                                    max={10}
                                    onChange={e => {
                                        if (e.target.value > 10) {
                                            setDifficultyWeight(10);
                                        } else if (e.target.value < 0) {
                                            setDifficultyWeight(0);
                                        }
                                        else {
                                            setDifficultyWeight(parseInt(e.target.value, 10));
                                        }
                                    }}
                                />
                            </div>
                            <div className='weight'>
                                <span>Deadline</span>
                                <input
                                    type='number'
                                    value={deadlineWeight}
                                    min={0}
                                    max={10}
                                    onChange={e => {
                                        if (e.target.value > 10) {
                                            setDeadlineWeight(10);
                                        } else if (e.target.value < 0) {
                                            setDeadlineWeight(0);
                                        }
                                        else {
                                            setDeadlineWeight(parseInt(e.target.value, 10));
                                        }
                                    }}
                                />
                            </div>
                            <div className='weight'>
                                <span>Parent Task</span>
                                <input
                                    type='number'
                                    value={parentTaskWeight}
                                    min={0}
                                    max={10}
                                    onChange={e => {
                                        if (e.target.value > 10) {
                                            setParentTaskWeight(10);
                                        } else if (e.target.value < 0) {
                                            setParentTaskWeight(0);
                                        }
                                        else {
                                            setParentTaskWeight(parseInt(e.target.value, 10));
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div id="run-ga-wrapper">
                        <button id="run-ga-button" onClick={startGeneticAlgorithm} > Run GA </button>
                    </div>

                </div>

            </div>
            <div className={`sidebar-overlay ${!showSidebar ? 'open' : ""} ${isHovered ? 'highlight' : ""}`} />

            <div className={`${showSidebar ? 'sidebar-space' : ''}`}>
                {renderSchedule()}
            </div>
        </div>
    );
};

export default SchedulePage;